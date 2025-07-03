// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, checkRoleMiddleware } = require('../utils/permissions');

// Middleware para todas as rotas de usuário que exigem autenticação
// router.use(authenticateToken);
router.get('/users', userController.getAllUserProfiles);
router.get('/users/:uid', userController.getUserProfile);
router.put('/users/:uid', userController.updateUserProfile); // A lógica de "próprio perfil" ou permissão de admin deve ser implementada dentro do controller
router.delete('/users/:uid', userController.deleteUser);
router.post('/users/:uid/roles', checkRoleMiddleware(['admin']), async (req, res) => {
  const { uid } = req.params;
  const { roles } = req.body; // Espera-se um array de strings para as roles

  if (!Array.isArray(roles)) {
    return res.status(400).json({ success: false, message: 'As roles devem ser um array.' });
  }

  try {
    // Chama o serviço de autenticação para atualizar as custom claims
    await authService.setUserRoles(uid, roles);
    // Chama o modelo de usuário para atualizar as roles no perfil do Firestore
    await User.updateUserProfile(uid, { roles });

    res.json({ success: true, message: `Roles do usuário ${uid} atualizadas para: ${roles.join(', ')}` });
  } catch (error) {
    console.error(`Erro ao atualizar roles do usuário ${uid}:`, error);
    res.status(500).send(`Erro ao atualizar roles do usuário: ${error.message}`);
  }
});

module.exports = router;
