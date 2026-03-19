/**
 * ASI Service handles all direct interactions with the ASI-1 API.
 * Uses robust fetch calls and structured JSON payloads.
 */
class AsiService {
    constructor() {
        this.apiKey = process.env.ASI_API_KEY;
        this.baseURL = process.env.ASI_API_URL || "https://api.asi1.ai/v1";
    }

    get isKeyValid() {
        return !!this.apiKey && this.apiKey !== 'YOUR_ASI_API_KEY';
    }

    /**
     * Reusable function to call the ASI API
     */
    async callAsiApi(endpoint, payload) {
        if (!this.isKeyValid) {
            console.log("⚠️ Valid ASI_API_KEY not found... Running mock ASI response.");
            return this.getMockResponse(payload);
        }

        try {
            console.log(`🔐 Calling ASI API Endpoint: ${endpoint}...`);
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`ASI API Error: ${response.status} - ${errorBody}`);
            }

            return await response.json();
        } catch (error) {
            console.error("ASI API Request Failed:", error.message);
            throw error;
        }
    }

    async generateTasksWorkflow(prompt) {
        try {
            const masterSystemPrompt = `You are an autonomous AI planning agent.
Your job is NOT just to extract tasks, but to THINK, PLAN, and EXECUTE.

When a user gives a goal:
1. Understand the intent deeply
2. If the goal is vague (like "Hii" or "help me"), make reasonable assumptions OR provide clarification questions.
3. Break the goal into a structured multi-step plan
4. Convert the plan into clear, actionable tasks
5. Assign priority (High / Medium / Low)
6. Suggest tools or technologies if relevant
7. Explain your reasoning briefly

Always behave like a real decision-making agent, not a chatbot.

If input is TOO vague, you MUST return a clarification JSON:
{
  "need_clarification": true,
  "questions": ["...", "..."]
}

Otherwise, return a complete execution plan and tasks:
{
  "goal": "...",
  "understanding": "...",
  "assumptions": ["...", "..."],
  "plan": ["step1", "step2", ...],
  "tasks": [
    {
      "title": "...",
      "description": "...",
      "priority": "High/Medium/Low"
    }
  ],
  "reasoning": "..."
}

Respond with RAW JSON ONLY. No markdown.`;

            const payload = {
                model: "asi1",
                messages: [
                    { role: "system", content: masterSystemPrompt },
                    { role: "user", content: `User Goal: "${prompt}"\n\nGenerate a complete execution plan or ask for clarification.` }
                ]
            };
            const response = await this.callAsiApi('/chat/completions', payload);

            let textReply = response?.choices?.[0]?.message?.content || response?.reply;
            if(!textReply && this.isKeyValid === false) {
                 textReply = response; 
            }

            const jsonObject = JSON.parse(textReply.match(/\{[\s\S]*\}/)?.[0] || textReply);
            return jsonObject;
        } catch (e) {
            console.warn("Failed to parse planner output from ASI, returning default.", e.message);
            return {
                goal: prompt,
                understanding: "Standard task extraction",
                assumptions: ["None"],
                plan: ["Execute immediate request"],
                tasks: [{ title: "Review ASI Output", description: "Plan generation failed.", priority: "High" }],
                reasoning: "Fallback triggered due to parsing error."
            };
        }
    }

    async analyzeDocumentWorkflow(text) {
        const payload = {
            model: "asi1",
            messages: [
                { role: "system", content: "You are an ASI Document Analyzer. Provide concise summaries and key insights." },
                { role: "user", content: `Please analyze the following document:\n\n${text}` }
            ]
        };
        const response = await this.callAsiApi('/chat/completions', payload);
        const reply = response?.choices?.[0]?.message?.content || response;
        return { summary: reply, insights: ["Extracted Insight 1", "Extracted Insight 2"] };
    }

    async detectIntent(taskCommand) {
        const payload = {
            model: "asi1",
            messages: [
                { role: "system", content: "You are an Intent Detection Agent. Identify if the command requires 'summarization', 'task_generation', or 'general_chat'. Respond with RAW JSON ONLY in format { \"intents\": [\"intent\"] }. Do not include any conversational text or markdown blocks." },
                { role: "user", content: `Command: "${taskCommand}"` }
            ]
        };
        const response = await this.callAsiApi('/chat/completions', payload);
        let textReply = response?.choices?.[0]?.message?.content || response;
        try {
            const parsed = JSON.parse(textReply.match(/\{.*\}/s)?.[0] || textReply);
            return parsed.intents || ["general_chat"];
        } catch (e) {
            return ["general_chat"];
        }
    }

    async executeGenericPrompt(prompt) {
        const payload = {
            model: "asi1",
            messages: [
                { role: "system", content: "You are a helpful ASI Copilot." },
                { role: "user", content: prompt }
            ]
        };
        const response = await this.callAsiApi('/chat/completions', payload);
        return response?.choices?.[0]?.message?.content || response;
    }

    getMockResponse(payload) {
        const content = JSON.stringify(payload).toLowerCase();
        
        if (content.includes("intent detection agent") || content.includes("{ \"intents\"")) {
            if (content.includes("hij") || content.includes("hi") || content.includes("hello") || content.includes("hey") || content.includes("how are you")) {
                return '{ "intents": ["general_chat"] }';
            }
            return '{ "intents": ["task_generation"] }';
        }
        if (content.includes("document analyzer")) {
            return "This is a mock ASI-1 document summary. The document contains technical specifications for an AI workflow automation platform.";
        }
        if (content.includes("autonomous ai planning agent")) {
            // Check if the prompt is very short or likely a greeting that bypassed intent detection
            const userPrompt = payload.messages[payload.messages.length - 1].content.toLowerCase();
            if (userPrompt.length < 5 || userPrompt.includes("hii") || userPrompt.includes("dz") || userPrompt.includes("rajat")) {
                return JSON.stringify({
                    need_clarification: true,
                    questions: ["How can I help you today?", "Would you like to analyze a document or create a task list?"]
                });
            }

            return JSON.stringify({
                goal: "Build a web app",
                understanding: "The user wants to create a web app but hasn't specified the technology stack or purpose.",
                assumptions: ["Beginner-level project", "No specific tech preference", "Likely needs full-stack guidance"],
                plan: ["Define app idea", "Choose tech stack", "Setup project structure", "Develop frontend", "Develop backend", "Integrate APIs", "Test", "Deploy"],
                tasks: [
                    { title: "Define app idea", description: "Decide what the app will do and target users", priority: "High" },
                    { title: "Choose tech stack", description: "Select technologies like React and Node.js", priority: "High" },
                    { title: "Setup project", description: "Initialize repo and install dependencies", priority: "Medium" }
                ],
                reasoning: "The input was vague, so assumptions were made to create a general beginner-friendly roadmap."
            });
        }
        if (content.includes("task generation agent") || content.includes("valid json array")) {
            return '[{"title":"Integrate ASI-1 API","description":"Map ASI API endpoints"},{"title":"Configure Express App","description":"Ensure safe cross-origin mapping"}]';
        }
        
        return "This is a mock response from the simulated ASI-1 backend API. Your workflow request has been successfully processed.";
    }
}

module.exports = new AsiService();
