import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/ai';

// Generate a unique session ID for the current chat session
const sessionId = 'session-' + Math.random().toString(36).substring(2, 15) + '-' + Date.now().toString(36);

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const executeWorkflow = async (data) => {
    try {
        const response = await api.post('/execute-workflow', { ...data, sessionId });
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const analyzeDocument = async (file) => {
    const formData = new FormData();
    formData.append('document', file);
    try {
        const response = await api.post('/analyze-document', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const generateTasks = async (prompt) => {
    try {
        const response = await api.post('/generate-tasks', { prompt, sessionId });
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const getTasks = async () => {
    try {
        const response = await api.get('/tasks');
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        return [];
    }
};

export const toggleTaskStatus = async (id) => {
    try {
        const response = await api.patch(`/tasks/${id}/toggle`);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const createTask = async (taskData) => {
    try {
        const response = await api.post('/tasks', taskData);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        const response = await api.delete(`/tasks/${id}`);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const getHistory = async () => {
    try {
        const response = await api.get('/chat/history');
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        return [];
    }
};

export default {
    executeWorkflow,
    analyzeDocument,
    generateTasks,
    getTasks,
    toggleTaskStatus,
    createTask,
    deleteTask,
    getHistory,
};
