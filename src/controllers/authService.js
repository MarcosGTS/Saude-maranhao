// services/authService.js (PARA BACKEND com Firebase Admin SDK)
const { auth } = require('../config/firebase'); // 'auth' agora vem do Admin SDK
const { createUserProfile, getUserProfile, deleteUserProfile } = require('../models/User');

/**
 * Cria um novo usuário no Firebase Authentication.
 * Também cria um perfil de usuário correspondente no Firestore.
 * @param {string} email - O email do usuário.
 * @param {string} password - A senha do usuário.
 * @param {string} displayName - O nome de exibição inicial do usuário.
 * @returns {Promise<admin.auth.UserRecord>} O objeto do usuário criado.
 */
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

/**
 * Exclui um usuário do Firebase Authentication.
 * Também exclui o perfil de usuário correspondente no Firestore.
 * @param {string} uid - O ID único do usuário a ser excluído.
 * @returns {Promise<void>}
 */
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

/**
 * Define funções personalizadas (custom claims) para um usuário.
 * Isso permite que você defina papéis para o usuário que podem ser verificados em regras de segurança do Firebase.
 * @param {string} uid - O ID do usuário.
 * @param {string[]} roles - Um array de strings representando as funções.
 * @returns {Promise<void>}
 */
async function setUserRoles(uid, roles) {
  try {
    await auth.setCustomUserClaims(uid, { roles });
    // Atualiza também no perfil do Firestore para fácil consulta
    await getUserProfile(uid).then(profile => {
      if (profile) {
        profile.roles = roles;
        // Não chame updateUserProfile aqui, para evitar um loop ou conflito.
        // As claims são o que importa para as regras de segurança e tokens.
        // O perfil no Firestore serve mais para exibir informações no app.
        // Se precisar sincronizar o perfil no Firestore, faça-o de forma independente.
        // Por exemplo, você pode usar uma Cloud Function para sincronizar claims com o perfil.
      }
    });

    console.log(`Funções ${roles.join(', ')} definidas para o usuário ${uid}`);
  } catch (error) {
    console.error('Erro ao definir funções para o usuário:', error.message);
    throw new Error(`Erro ao definir funções para o usuário: ${error.message}`);
  }
}

/**
 * Obtém um usuário pelo UID do Firebase Authentication.
 * @param {string} uid - O ID do usuário.
 * @returns {Promise<admin.auth.UserRecord>} O objeto do usuário.
 */
async function getUserByUid(uid) {
  try {
    return await auth.getUser(uid);
  } catch (error) {
    console.error('Erro ao obter usuário por UID:', error.message);
    throw new Error(`Erro ao obter usuário por UID: ${error.message}`);
  }
}

/**
 * Verifica se um token de ID do Firebase é válido e decodifica-o.
 * @param {string} idToken - O token de ID recebido do cliente.
 * @returns {Promise<admin.auth.DecodedIdToken>} O token decodificado.
 */
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
