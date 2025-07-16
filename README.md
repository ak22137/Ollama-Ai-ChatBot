# AI Chatbot with NLP
<img src="https://raw.githubusercontent.com/ak22137/Ollama-Ai-ChatBot/main/Chatbotgif.gif" width="500"/>
An intelligent conversational AI chatbot using transformer models and natural language understanding. This project uses FastAPI for the backend API and React for the frontend interface.

## Features

- Real-time chat interface
- Natural Language Processing using transformers
- Modern, responsive UI with Material-UI
- FastAPI backend with high performance
- Easy to extend and customize

## Project Structure

```
 src/
    -backend/
         -![Chatbotgif](https://github.com/user-attachments/assets/de2fcf75-a4dd-423c-bbf3-7918b36b63f8)
main.py
         
    -frontend/
         src/
            App.js
            index.js
            package.json
AI Chatbot with Ollama
**Created by Akshat Singh Panwar**

A modern ChatGPT-like interface for interacting with Ollama AI models locally. This project features a FastAPI backend and a React frontend with Material-UI components.

## ✨ Features

- 🤖 **Local AI Models**: Connect to any Ollama model
- 💬 **ChatGPT-like UI**: Modern, responsive chat interface
- 🎨 **Beautiful Design**: Clean Material-UI styling
- 🔄 **Model Switching**: Change AI models on the fly
- ⚡ **Real-time Chat**: Fast API communication
- 📱 **Responsive**: Works on desktop and mobile
- 🔒 **Privacy**: All processing happens locally

## 🚀 Quick Start

### Prerequisites
- **Ollama** installed and running ([Download](https://ollama.ai))
- **Python 3.8+**
- **Node.js 16+**

### Installation
1. **Clone the repository**
2. **Pull an AI model**: `ollama pull qwen3:1.7b`
3. **Run the startup script**: Double-click `start.bat`

### Manual Setup
```bash
# Backend
cd src/backend
pip install -r requirements.txt
python main.py

# Frontend (new terminal)
cd src/frontend
npm install
npm start
```

## 🎯 Usage
1. Open `http://localhost:3000`
2. Select your AI model from the dropdown
3. Start chatting with the AI!

## 🛠️ Technology Stack
- **Backend**: FastAPI, Python
- **Frontend**: React, Material-UI
- **AI**: Ollama (Llama, Qwen, Mistral, etc.)

## 📝 API Endpoints
- `POST /chat` - Send message to AI
- `GET /models` - List available models
- `GET /health` - Health check

## 🎨 Customization
- Change default model in `src/backend/main.py`
- Modify theme in `src/frontend/src/index.js`

## 🤝 Contributing
Created by **Akshat Singh Panwar**. Feel free to contribute!

## 📄 License
MIT License - Open source and free to use.
```

## Setup Instructions

### Backend Setup

1. Create and activate virtual environment:
   ```bash
   # Windows
   .\venv\Scripts\activate

 
   ```

2. Install backend dependencies:
   ```bash
   cd src/backend
   pip install -r requirements.txt
   ```

3. Start the backend server:
   ```bash
   python main.py
   ```
   The API will be available at http://localhost:8000

### Frontend Setup

1. Install frontend dependencies:
   ```bash
   cd src/frontend
   npm install
   ```

2. Start the frontend development server:
   ```bash
   npm start
   ```
   The application will be available at http://localhost:3000

## Usage

1. Open your browser and navigate to http://localhost:3000
2. Type your message in the input field
3. Press Enter or click the Send button to chat with the AI
4. The AI will process your message and respond in a natural conversational manner

## Technical Details

- Backend: FastAPI with Python 3.8+
- Frontend: React 18 with Material-UI
- NLP: Transformers library with DialoGPT model
- API Communication: Axios for HTTP requests

## Customization

You can customize the chatbot by:

1. Changing the transformer model in `main.py`
2. Modifying the chat interface in `App.js`
3. Adjusting the theme in `index.js`
4. Adding new API endpoints in `main.py`

