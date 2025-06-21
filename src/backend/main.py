from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from typing import Optional
import time

app = FastAPI(title="AI Chatbot API - Created by Akshat Singh Panwar")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ollama configuration
OLLAMA_URL = "http://localhost:11434"
DEFAULT_MODEL = "qwen3:1.7b"

class ChatMessage(BaseModel):
    message: str
    model: Optional[str] = DEFAULT_MODEL

class ChatResponse(BaseModel):
    response: str
    model: str
    created_at: str

class ModelInfo(BaseModel):
    name: str
    size: str
    modified_at: str

def format_size(size_bytes):
    """Convert bytes to human readable format"""
    if isinstance(size_bytes, str):
        return size_bytes
    
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if size_bytes < 1024.0:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024.0
    return f"{size_bytes:.1f} PB"

async def get_ollama_response(message: str, model: str = DEFAULT_MODEL) -> str:
    """Get response from Ollama API"""
    try:
        response = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json={
                "model": model,
                "prompt": message,
                "stream": False
            },
            timeout=120
        )
        response.raise_for_status()
        return response.json()["response"]
    except requests.exceptions.ConnectionError:
        raise HTTPException(status_code=503, detail="Cannot connect to Ollama. Make sure Ollama is running on localhost:11434")
    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail="Request to Ollama timed out")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ollama error: {str(e)}")

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(chat_message: ChatMessage):
    try:
        response_text = await get_ollama_response(chat_message.message, chat_message.model)
        
        return ChatResponse(
            response=response_text,
            model=chat_message.model,
            created_at=time.strftime("%Y-%m-%d %H:%M:%S")
        )
    
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/models")
async def list_models():
    """List available Ollama models"""
    try:
        response = requests.get(f"{OLLAMA_URL}/api/tags")
        response.raise_for_status()
        models = response.json().get("models", [])
        return {
            "models": [
                ModelInfo(
                    name=model["name"],
                    size=format_size(model.get("size", 0)),
                    modified_at=model.get("modified_at", "Unknown")
                ) for model in models
            ]
        }
    except requests.exceptions.ConnectionError:
        raise HTTPException(status_code=503, detail="Cannot connect to Ollama")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)