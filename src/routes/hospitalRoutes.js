// routes/diseaseRoutes.js
const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');
const { authenticateToken, checkRoleMiddleware } = require('../utils/permissions');

// Middleware para todas as rotas de doença que exigem autenticação
// router.use(authenticateToken);
router.use(express.json());
router.get('/hospital/', hospitalController.getAllHospitals);
router.get('/hospital/:id', hospitalController.getHospital);

module.exports = router;