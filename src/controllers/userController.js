// controllers/userController.js
const User = require('../models/User');
const authService = require('./authService'); // Para operações de usuário do Admin SDK (ex: definir claims)

/**
 * Obtém o perfil de um usuário por UID.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
async function getUserProfile(req, res) {
  const { uid } = req.params; // Assume que o UID do usuário vem dos parâmetros da URL
  try {
    const userProfile = await User.getUserProfile(uid);
    if (!userProfile) {
      return res.status(404).json({ success: false, message: 'Perfil de usuário não encontrado.' });
    }
    res.json({
      success: true,
      message: `Perfil do usuário ${uid} recuperado com sucesso!`,
      data: userProfile
    });
  } catch (err) {
    console.error(`Erro ao recuperar perfil do usuário ${uid}:`, err);
    res.status(500).send(`Algo de errado aconteceu ao recuperar perfil do usuário: ${err.message}`);
  }
}

/**
 * Atualiza o perfil de um usuário existente.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
async function updateUserProfile(req, res) {
  const { uid } = req.params; // Assume que o UID do usuário vem dos parâmetros da URL
  const updates = req.body; // Os campos a serem atualizados vêm do corpo da requisição
  try {
    const userExists = await User.getUserProfile(uid);
    if (!userExists) {
      return res.status(404).json({ success: false, message: 'Perfil de usuário não encontrado para atualização.' });
    }

    // Se as roles estão sendo atualizadas, também atualize as custom claims do Firebase Auth
    if (updates.roles && Array.isArray(updates.roles)) {
      await authService.setUserRoles(uid, updates.roles);
    }

    await User.updateUserProfile(uid, updates);
    res.json({
      success: true,
      message: `Perfil do usuário ${uid} atualizado com sucesso!`
    });
  } catch (err) {
    console.error(`Erro ao atualizar perfil do usuário ${uid}:`, err);
    res.status(500).send(`Erro ao atualizar perfil do usuário: ${err.message}`);
  }
}

/**
 * Exclui um usuário (incluindo perfil do Firestore e registro no Firebase Auth).
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
async function deleteUser(req, res) {
  const { uid } = req.params; // Assume que o UID do usuário vem dos parâmetros da URL
  try {
    // A função deleteUser do authService já lida com a exclusão do Firebase Auth
    // e com a exclusão do perfil do Firestore via o modelo User.
    await authService.deleteUser(uid);
    res.json({
      success: true,
      message: `Usuário ${uid} e seu perfil excluídos com sucesso!`
    });
  } catch (err) {
    console.error(`Erro ao excluir usuário ${uid}:`, err);
    res.status(500).send(`Erro ao excluir usuário: ${err.message}`);
  }
}

// Nota: A criação de usuários é feita através da rota de registro (authService.createUser)
// e não é exposta diretamente como um `create` aqui no userController,
// pois está ligada ao processo de autenticação.

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUser,
};
