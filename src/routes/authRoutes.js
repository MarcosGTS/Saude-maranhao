const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken, checkRoleMiddleware } = require('../utils/permissions');

// Middleware para todas as rotas de doença que exigem autenticação
// router.use(authenticateToken);
router.post('/register/', authController.register);

module.exports = router;

