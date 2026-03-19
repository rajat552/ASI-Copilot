const express = require('express');
const router = express.Router();
const asiController = require('../controllers/asiController');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const auth = require('../middleware/auth');

router.post('/generate-tasks', auth, asiController.generateTasks);
router.post('/analyze-document', auth, upload.single('document'), asiController.analyzeDocument);
router.post('/execute-workflow', auth, asiController.executeWorkflow);

router.get('/tasks', asiController.getTasks);
router.post('/tasks', asiController.createTask);
router.patch('/tasks/:id/toggle', asiController.toggleTaskStatus);
router.delete('/tasks/:id', asiController.deleteTask);
router.get('/chat/history', asiController.getHistory);

module.exports = router;
