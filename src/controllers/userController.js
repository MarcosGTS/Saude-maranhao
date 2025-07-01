const User = require('../models/User');
const authService = require('./authService');

async function getUserProfile(req, res) {
  const { uid } = req.params;
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

async function getAllUserProfiles(req, res) {
  try {
    const users = await User.getAllUserProfiles();
    res.json({
      success: true,
      message: `Perfis recuperados com sucesso!`,
      data: users,
    });
  } catch (err) {
    console.error(`Erro ao recuperar os Perfis`, err);
    res.status(500).send(`Algo de errado aconteceu ao recuperar os Perfis`);
  }
}

async function updateUserProfile(req, res) {
  const { uid } = req.params;
  const updates = req.body;
  try {
    const userExists = await User.getUserProfile(uid);
    if (!userExists) {
      return res.status(404).json({ success: false, message: 'Perfil de usuário não encontrado para atualização.' });
    }

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

async function deleteUser(req, res) {
  const { uid } = req.params;
  try {
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

module.exports = {
  getUserProfile,
  getAllUserProfiles,
  updateUserProfile,
  deleteUser,
};
