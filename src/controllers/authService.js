// services/authService.js (PARA BACKEND com Firebase Admin SDK)
const { auth } = require('../config/firebase'); // 'auth' agora vem do Admin SDK
const { createUserProfile, getUserProfile, deleteUserProfile } = require('../models/User');

async function createUser(email, password, displayName) {
  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
    });
    console.log(`Usuário Firebase Auth criado: ${userRecord.uid}`);

    // Cria o perfil do usuário no Firestore com uma role padrão
    await createUserProfile(userRecord.uid, userRecord.email, userRecord.displayName);
    return userRecord;
  } catch (error) {
    console.error('Erro ao criar usuário:', error.message);
    throw new Error(`Erro ao criar usuário: ${error.message}`);
  }
}

async function deleteUser(uid) {
  try {
    await auth.deleteUser(uid);
    console.log(`Usuário Firebase Auth ${uid} excluído.`);
    // Também exclui o perfil do usuário no Firestore
    await deleteUserProfile(uid);
  } catch (error) {
    console.error('Erro ao excluir usuário:', error.message);
    throw new Error(`Erro ao excluir usuário: ${error.message}`);
  }
}

async function setUserRoles(uid, roles) {
  try {
    await auth.setCustomUserClaims(uid, { roles });
    await getUserProfile(uid).then(profile => {
      if (profile) {
        profile.roles = roles;
     }
    });

    console.log(`Funções ${roles.join(', ')} definidas para o usuário ${uid}`);
  } catch (error) {
    console.error('Erro ao definir funções para o usuário:', error.message);
    throw new Error(`Erro ao definir funções para o usuário: ${error.message}`);
  }
}

async function getUserByUid(uid) {
  try {
    return await auth.getUser(uid);
  } catch (error) {
    console.error('Erro ao obter usuário por UID:', error.message);
    throw new Error(`Erro ao obter usuário por UID: ${error.message}`);
  }
}

async function verifyIdToken(idToken) {
  try {
    return await auth.verifyIdToken(idToken);
  } catch (error) {
    console.error('Erro ao verificar token de ID:', error.message);
    throw new Error(`Erro ao verificar token de ID: ${error.message}`);
  }
}

module.exports = {
  createUser,
  deleteUser,
  setUserRoles,
  getUserByUid,
  verifyIdToken,
};
