const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    userId: { type: String, default: 'demo-user' },
    role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
    content: { type: String, required: true },
    intents: [String], // Intelligently track what we were talking about
    timestamp: { type: Date, default: Date.now, index: true }
});

ConversationSchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('Conversation', ConversationSchema);
