# ASI-Copilot: Inclusive AI Productivity

> **An Agentic AI Assistant powered by ASI:One that understands voice commands, reasons about tasks, and automates multi-step productivity workflows for everyone.**

Built for the **API Innovate 2026 Hackathon** 🏆

---

## 📖 Project Story

### 💡 Inspiration
In today's fast-paced digital world, productivity tools are often overly complex. We built a solution that changes lives by making digital productivity truly accessible. Our AI copilot feels like a real human assistant—one you can simply talk to, and it handles the cognitive load of organizing, planning, and executing tasks using the **ASI:One** intelligent AI platform.

### ⚙️ What it does
Our copilot is an Agentic AI Assistant that bridges the gap between thought and action. Instead of navigating complex UIs, users can use their voice to issue natural language commands. 
- **Voice-First Interaction:** Users can simply say, "Summarize this document and create tasks for tomorrow."
- **Agentic Reasoning:** Powered by **ASI:One**, the app detects intent, reasons about the request, and plans a multi-step execution strategy.
- **Workflow Automation:** It automatically executes steps like parsing documents, extracting action items, and saving them directly to a database without manual data entry.
- **Accessible UI:** A calming glassmorphism design with micro-animations reduces cognitive overload.

### 🛠️ How we built it
We architected the application using a modern, scalable tech stack:
- **Frontend:** React, Vite, and Tailwind CSS v4 for a highly responsive, accessible UI. We integrated the Web Speech API for seamless voice input.
- **Backend:** Node.js and Express.js to handle business logic and API routing.
- **AI Engine:** We utilized the **ASI-1 API** as the core reasoning engine for intent detection and natural language processing.
- **Database:** MongoDB Atlas to store users, tasks, and conversational memory persistently.
- **Architecture:** We designed an "Agentic Workflow" pattern that visually shows the user exactly what the AI is thinking and doing in real-time, building trust and transparency.

### ⚠️ Challenges we ran into
- **Voice API Reliability:** We struggled with the Web Speech API dropping out or throwing `no-speech` errors. We overcame this by writing custom React hooks to manage interim results, carefully controlling the microphone lifecycle.
- **AI Prompt Engineering:** Getting ASI:One to consistently output perfectly structured JSON for the task pipeline required structured prompting to ensure it shaped and sharpened the idea through iteration as a genuine thinking tool.
- **Real-time State Sync:** Ensuring that the chat interface and the live task board stayed perfectly synchronized when the AI generated new tasks in the background required a robust React state management approach.

### 🏆 Accomplishments that we're proud of
- Successfully building a multi-agent workflow where the AI plans its own steps before executing them using ASI:One.
- Creating a buttery-smooth, accessible user interface that feels both premium and intuitive.

### 📚 What we learned
- Deepened our understanding of Agentic AI architectures versus standard chatbots.
- Learned how to effectively integrate and orchestrate ASI-1 models within a Node.js ecosystem using structured outputs.

### 🚀 What's next
- **Integration with more tools:** Connecting to Google Calendar, Outlook, and Notion.
- **Advanced RAG:** Using embeddings to allow users to "chat" across their entire workspace history.
- **Mobile App:** Bringing the voice-first experience to iOS and Android to help users capture tasks on the go.

---

## 📌 Hackathon Requirements Checklist

- [x] **GitHub repository link:** [asi-copilot-repo-link](https://github.com/rajat552/ASI-Copilot) *(Placeholder for final link)*
- [x] **Working project with ASI-1 API integration:** Verified and integrated into the Node.js backend (`asiService.js`).
- [x] **README with project description and setup instructions:** Provided below.
- [x] **Code documentation:** The codebase has clean, clear, and natural comments explaining the logic.
- [x] **Demo video or screenshots:** *(Optional: Add demo screenshots or YouTube link here)*

---

## 🛠️ Tech Stack & Features

| Layer | Technology |
|-------|-----------|
| **AI Engine** | ASI-1 API |
| **Voice** | Web Speech API |
| **Agent Sim** | Custom ASI-1 Tool-Calling Workflow |
| **Frontend** | React + Vite + Tailwind CSS v4 |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Animations** | Framer Motion |

### ✨ Key Features
- **Agentic Workflow Engine:** Multi-step command execution with intent detection using ASI-1's reasoning.
- **Voice-First AI Chat:** Conversational memory and live voice dictation.
- **Document Intelligence:** AI-powered document summarization and automatic task extraction.
- **Smart Task Pipeline:** AI-generated tasks saved to MongoDB with real-time sync.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- ASI-1 API access

### 1. Clone the repo
```bash
git clone https://github.com/rajat552/ASI-Copilot.git
cd ASI-Copilot
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file containing your MongoDB and ASI-1 keys:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/asi-copilot
ASI_API_KEY=your_asi_api_key_here
```

Start the server:
```bash
node server.js
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit **http://localhost:5173** 🚀

---

## 👨‍💻 Author

**Rajat Aggarwal**
- GitHub: [@rajat552](https://github.com/rajat552)

---

## 📄 License

This project is built for the **API Innovate 2026 Hackathon**.
