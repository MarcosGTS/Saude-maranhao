// models/User.js
const { db, admin } = require('../config/firebase'); // Agora 'db' e 'admin' vêm do Admin SDK

/**
 * @typedef {Object} UserProfile
 * @property {string} uid - O ID único do usuário do Firebase Authentication.
 * @property {string} email - O email do usuário.
 * @property {string} displayName - O nome de exibição do usuário.
 * @property {string[]} roles - Um array de strings que representam as permissões do usuário (ex: ['admin', 'editor', 'viewer']).
 * @property {firebase.firestore.Timestamp} createdAt - A data e hora de criação do perfil.
 * @property {firebase.firestore.Timestamp} updatedAt - A data e hora da última atualização do perfil.
 */

/**
 * Cria um novo perfil de usuário no Firestore.
 * Geralmente chamado após um usuário ser criado via Firebase Admin Auth.
 * @param {string} uid - O ID do usuário.
 * @param {string} email - O email do usuário.
 * @param {string} displayName - O nome de exibição inicial do usuário.
 * @param {string[]} [roles=['user']] - As funções/papéis iniciais do usuário. Padrão para 'user'.
 * @returns {Promise<void>}
 */
async function createUserProfile(uid, email, displayName, roles = ['admin', 'user']) {
  try {
    const userRef = db.collection('tb_users').doc(uid);
    await userRef.set({
      uid,
      email,
      displayName: displayName || email,
      roles,
      createdAt: admin.firestore.Timestamp.now(), // Usando Timestamp do Admin SDK
      updatedAt: admin.firestore.Timestamp.now(),
    });
    console.log(`Perfil do usuário ${uid} criado com sucesso.`);
  } catch (error) {
    console.error('Erro ao criar perfil do usuário:', error.message);
    throw new Error(`Erro ao criar perfil do usuário: ${error.message}`);
  }
}

/**
 * Obtém o perfil de usuário do Firestore.
 * @param {string} uid - O ID do usuário.
 * @returns {Promise<UserProfile|null>} O perfil do usuário ou null se não encontrado.
 */
async function getUserProfile(uid) {
  try {
    const userRef = db.collection('tb_users').doc(uid);
    const doc = await userRef.get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error('Erro ao obter perfil do usuário:', error.message);
    throw new Error(`Erro ao obter perfil do usuário: ${error.message}`);
  }
}

/**
 * Atualiza um perfil de usuário existente no Firestore.
 * @param {string} uid - O ID do usuário.
 * @param {Object} updates - Os campos a serem atualizados no perfil.
 * @param {string} [updates.displayName] - Novo nome de exibição.
 * @param {string[]} [updates.roles] - Novas funções/papéis.
 * @returns {Promise<void>}
 */
async function updateUserProfile(uid, updates) {
  try {
    const userRef = db.collection('tb_users').doc(uid);
    updates.updatedAt = admin.firestore.Timestamp.now();
    await userRef.update(updates);
    console.log(`Perfil do usuário ${uid} atualizado com sucesso.`);
  } catch (error) {
    console.error('Erro ao atualizar perfil do usuário:', error.message);
    throw new Error(`Erro ao atualizar perfil do usuário: ${error.message}`);
  }
}

/**
 * Exclui o perfil de usuário do Firestore.
 * (Nota: Isso não exclui o usuário do Firebase Authentication. Isso deve ser feito separadamente via Admin SDK.)
 * @param {string} uid - O ID do usuário a ser excluído.
 * @returns {Promise<void>}
 */
async function deleteUserProfile(uid) {
  try {
    await db.collection('tb_users').doc(uid).delete();
    console.log(`Perfil do usuário ${uid} excluído com sucesso.`);
  } catch (error) {
    console.error('Erro ao excluir perfil do usuário:', error.message);
    throw new Error(`Erro ao excluir perfil do usuário: ${error.message}`);
  }
}

module.exports = {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
