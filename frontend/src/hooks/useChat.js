import { useState, useCallback, useEffect } from 'react';
import { executeWorkflow, getHistory } from '../services/api';

export const useChat = () => {
    const defaultMessage = { role: 'assistant', content: 'Hello! I am your AI Copilot. How can I help you today?' };
    const [messages, setMessages] = useState([defaultMessage]);
    const [loading, setLoading] = useState(false);


    const sendMessage = useCallback(async (content) => {
        if (!content.trim()) return null;

        const userMsg = { role: 'user', content };
        setMessages(prev => [...prev, userMsg]);
        setLoading(true);

        try {
            const data = await executeWorkflow({ prompt: content });
            const assistantContent = data.reply || data.response || data.message || "Workflow executed successfully.";
            const assistantMsg = { role: 'assistant', content: assistantContent };
            setMessages(prev => [...prev, assistantMsg]);
            return data;
        } catch (error) {
            let errorMessage = 'Error: Could not reach the AI server.';
            
            const responseError = error.response?.data?.error || error.response?.data?.message || '';

            if (responseError.includes('API_QUOTA_EXCEEDED')) {
                errorMessage = '⚠️ API Quota Exceeded. Please try again later.';
            } else if (error.message?.includes('API_QUOTA_EXCEEDED')) {
                errorMessage = '⚠️ API Quota Exceeded. Please try again later.';
            } else if (error.response?.status === 429) {
                errorMessage = '⚠️ API Rate Limit Exceeded. Please slow down and try again.';
            }

            setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return { messages, loading, sendMessage };
};
