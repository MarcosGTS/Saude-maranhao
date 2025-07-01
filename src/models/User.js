const { db, admin } = require('../config/firebase');

async function createUserProfile(uid, email, displayName, roles = ['admin', 'user']) {
  try {
    const userRef = db.collection('tb_users').doc(uid);
    await userRef.set({
      uid,
      email,
      displayName: displayName || email,
      roles,
      createdAt: admin.firestore.Timestamp.now(), 
      updatedAt: admin.firestore.Timestamp.now(),
    });
    console.log(`Perfil do usuário ${uid} criado com sucesso.`);
  } catch (error) {
    console.error('Erro ao criar perfil do usuário:', error.message);
    throw new Error(`Erro ao criar perfil do usuário: ${error.message}`);
  }
}

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

async function getAllUserProfiles() {
  try {
    const usersSnapshot = await db.collection('tb_users').get();
    const users = [];

    usersSnapshot.forEach(doc => {
      users.push({id: doc.id, ...doc.data()});
    })
    
    return users;
  } catch (error) {
    console.error('Erro ao obter Usuários:', error.message);
    throw new Error(`Erro ao obter Usuários: ${error.message}`);
  }
}

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
  getAllUserProfiles,
  updateUserProfile,
  deleteUserProfile,
};
