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
            const systemInstruction = "You are an ASI Task Generation Agent. Extract actionable tasks based on the prompt. Return valid JSON array with 'title' and 'description'.";
            const payload = {
                model: "asi-1",
                messages: [
                    { role: "system", content: systemInstruction },
                    { role: "user", content: prompt }
                ]
            };
            const response = await this.callAsiApi('/chat/completions', payload);

            let textReply = response?.choices?.[0]?.message?.content || response?.reply;
            if(!textReply && this.isKeyValid === false) {
                 textReply = response; 
            }

            const jsonStr = textReply.match(/\[[\s\S]*\]/)?.[0] || textReply;
            return JSON.parse(jsonStr);
        } catch (e) {
            console.warn("Failed to parse tasks from ASI, returning default.", e.message);
            return [{ title: "Review ASI Output", description: "ASI task extraction failed or returned unstructured text." }];
        }
    }

    async analyzeDocumentWorkflow(text) {
        const payload = {
            model: "asi-1",
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
            model: "asi-1",
            messages: [
                { role: "system", content: "You are an Intent Detection Agent. Identify if the command requires 'summarization', 'task_generation', or 'general_chat'. Respond with JSON format { 'intents': ['intent'] }." },
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
            model: "asi-1",
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
        
        if (content.includes("intent detection agent") || content.includes("{ 'intents'")) {
            return '{ "intents": ["task_generation"] }';
        }
        if (content.includes("document analyzer")) {
            return "This is a mock ASI-1 document summary. The document contains technical specifications for an AI workflow automation platform.";
        }
        if (content.includes("task generation agent") || content.includes("valid json array")) {
            return '[{"title":"Integrate ASI-1 API","description":"Map ASI API endpoints"},{"title":"Configure Express App","description":"Ensure safe cross-origin mapping"}]';
        }
        
        return "This is a mock response from the simulated ASI-1 backend API. Your workflow request has been successfully processed.";
    }
}

module.exports = new AsiService();
