==================================================
           AI CHATBOT WITH OLLAMA
          Created by Akshat Singh Panwar
==================================================

ABOUT THE PROJECT:
This is a modern AI chatbot application that provides a ChatGPT-like interface 
for interacting with local AI models through Ollama. The application features 
a beautiful web interface built with React and Material-UI, connected to a 
FastAPI backend that communicates with Ollama.

FEATURES:
• Modern ChatGPT-like user interface
• Real-time chat with AI models
• Support for multiple Ollama models
• Model switching during conversation
• Responsive design for all devices
• Message timestamps and user avatars
• Beautiful animations and smooth scrolling
• Local AI processing (privacy-focused)

TECHNOLOGY STACK:
• Backend: FastAPI (Python)
• Frontend: React with Material-UI
• AI Engine: Ollama (Local AI models)
• Styling: Custom Material-UI theme

REQUIREMENTS:
• Python 3.8 or higher
• Node.js 16 or higher
• Ollama installed and running
• At least one AI model pulled in Ollama

QUICK START:
1. Install Ollama from https://ollama.ai
2. Pull an AI model: ollama pull qwen3:1.7b
3. Start Ollama service
4. Install backend dependencies: pip install -r src/backend/requirements.txt
5. Start backend: python src/backend/main.py
6. Install frontend dependencies: npm install (in src/frontend folder)
7. Start frontend: npm start (in src/frontend folder)
8. Open http://localhost:3000 in your browser

AVAILABLE ENDPOINTS:
• POST /chat - Send message to AI
• GET /models - List available models
• GET /health - Check API status

CUSTOMIZATION:
You can change the default AI model by editing the DEFAULT_MODEL variable 
in src/backend/main.py. The frontend theme can be customized in 
src/frontend/src/index.js.

SUPPORTED MODELS:
This chatbot works with any Ollama-compatible model including:
• Llama models (llama3, llama3.1, llama3.2)
• Qwen models (qwen, qwen2, qwen3)
• Mistral models
• CodeLlama for coding assistance
• And many more from the Ollama library

TROUBLESHOOTING:
• If you get connection errors, ensure Ollama is running on localhost:11434
• For timeout issues, try using a smaller model like qwen3:1.7b
• Check that all dependencies are installed correctly
• Verify that the required ports (3000, 8001) are available

DEVELOPER:
Akshat Singh Panwar

LICENSE:
This project is open source and available under the MIT License.

CONTACT:
For questions or support, please refer to the documentation or 
check the project repository.

==================================================
           Thank you for using AI Chatbot!
==================================================
