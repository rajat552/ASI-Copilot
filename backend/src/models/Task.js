const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    createdAt: { type: Date, default: Date.now, index: true }
});

TaskSchema.index({ status: 1 });

module.exports = mongoose.model('Task', TaskSchema);
