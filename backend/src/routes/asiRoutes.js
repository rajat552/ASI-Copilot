const express = require('express');
const router = express.Router();
const asiController = require('../controllers/asiController');
const multer = require('multer');

// Configure multer for memory storage (for file uploads)
const upload = multer({ storage: multer.memoryStorage() });

// Assuming standard auth middleware from existing backend structure
const auth = require('../middleware/auth');

// ASI-1 Endpoints
router.post('/generate-tasks', auth, asiController.generateTasks);
router.post('/analyze-document', auth, upload.single('document'), asiController.analyzeDocument);
router.post('/execute-workflow', auth, asiController.executeWorkflow);

// --- TASK & CHAT HISTORY CRUD ---
router.get('/tasks', asiController.getTasks);
router.post('/tasks', asiController.createTask);
router.patch('/tasks/:id/toggle', asiController.toggleTaskStatus);
router.delete('/tasks/:id', asiController.deleteTask);
router.get('/chat/history', asiController.getHistory);

module.exports = router;
