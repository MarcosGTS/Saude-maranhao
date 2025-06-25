// routes/diseaseRoutes.js
const express = require('express');
const router = express.Router();
const diseaseController = require('../controllers/diseaseController');
const { authenticateToken, checkRoleMiddleware } = require('../utils/permissions');

// Middleware para todas as rotas de doença que exigem autenticação
// router.use(authenticateToken);
router.get('/diseases/', diseaseController.getDiseases);
router.get('/diseases/:id', diseaseController.getDiseaseById);
router.post('/diseases/', checkRoleMiddleware(['admin', 'editor']), diseaseController.createDisease);
router.put('/diseases/:id', checkRoleMiddleware(['admin', 'editor']), diseaseController.updateDisease);
router.delete('/diseases/:id', checkRoleMiddleware(['admin']), diseaseController.deleteDisease);

module.exports = router;
