const { db, admin } = require('../config/firebase');

/**
 * @typedef {Object} Disease
 * @property {string} id - O ID único da doença.
 * @property {string[]} sintomas - Um array de sintomas associados à doença.
 * @property {string} nomeDoenca - O nome da doença.
 * @property {string} faixaEtaria - A faixa etária mais afetada pela doença.
 * @property {string[]} recomendacoes - Um array de recomendações para a doença.
 * @property {firebase.firestore.Timestamp} createdAt - A data e hora de criação do registro da doença.
 * @property {firebase.firestore.Timestamp} updatedAt - A data e hora da última atualização do registro da doença.
 */

/**
 * Obtém todas as doenças do Firestore.
 * @returns {Promise<Disease[]>} Uma promessa que resolve para um array de objetos de doença.
 */
async function getDiseases() {
  try {
    const diseasesSnapshot = await db.collection('tb_diseases').get();
    const diseases = [];

    for (const diseaseDoc of diseasesSnapshot.docs) {
      const diseaseData = diseaseDoc.data();
      diseases.push({
        id: diseaseDoc.id,
        ...diseaseData,
      });
    }

    return diseases;
  } catch (error) {
    console.error(`Erro ao obter doenças: ${error.message}`);
    // Em um ambiente de produção, você pode querer lançar o erro ou lidar com ele de forma mais robusta.
    throw new Error(`Erro ao obter doenças: ${error.message}`);
  }
}

/**
 * Obtém uma única doença pelo seu ID.
 * @param {string} diseaseId - O ID da doença a ser obtida.
 * @returns {Promise<Disease|null>} Uma promessa que resolve para o objeto da doença ou null se não for encontrada.
 */
async function getDiseaseById(diseaseId) {
  try {
    const diseaseRef = db.collection('tb_diseases').doc(diseaseId);
    const diseaseDoc = await diseaseRef.get();

    if (!diseaseDoc.exists) {
      return null;
    }

    return {
      id: diseaseDoc.id,
      ...diseaseDoc.data(),
    };
  } catch (error) {
    console.error(`Erro ao obter doença por ID: ${error.message}`);
    throw new Error(`Erro ao obter doença por ID: ${error.message}`);
  }
}

/**
 * Cria um novo registro de doença no Firestore.
 * @param {Object} data - Os dados da nova doença.
 * @param {string[]} data.sintomas - Um array de sintomas.
 * @param {string} data.nomeDoenca - O nome da doença.
 * @param {string} data.faixaEtaria - A faixa etária.
 * @param {string[]} data.recomendacoes - Um array de recomendações.
 * @returns {Promise<string>} Uma promessa que resolve para o ID da doença recém-criada.
 */
async function createDisease({ sintomas, nomeDoenca, faixaEtaria, recomendacoes }) {
  try {
    const reference = db.collection('tb_diseases').doc();

    await reference.set({
      sintomas: sintomas || [],
      nomeDoenca,
      faixaEtaria,
      recomendacoes: recomendacoes || [],
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
    });

    return reference.id;
  } catch (error) {
    console.error(`Erro ao criar doença: ${error.message}`);
    throw new Error(`Erro ao criar doença: ${error.message}`);
  }
}

/**
 * Atualiza um registro de doença existente no Firestore.
 * @param {string} diseaseId - O ID da doença a ser atualizada.
 * @param {Object} updates - Os campos a serem atualizados.
 * @param {string[]} [updates.sintomas] - Novos sintomas.
 * @param {string} [updates.nomeDoenca] - Novo nome da doença.
 * @param {string} [updates.faixaEtaria] - Nova faixa etária.
 * @param {string[]} [updates.recomendacoes] - Novas recomendações.
 * @returns {Promise<void>} Uma promessa que resolve quando a doença é atualizada.
 */
async function updateDisease(diseaseId, updates) {
  try {
    const diseaseRef = db.collection('tb_diseases').doc(diseaseId);

    // Adiciona o timestamp de atualização
    updates.updatedAt = admin.firestore.Timestamp.now();

    await diseaseRef.update(updates);
  } catch (error) {
    console.error(`Erro ao atualizar doença: ${error.message}`);
    throw new Error(`Erro ao atualizar doença: ${error.message}`);
  }
}

/**
 * Exclui um registro de doença do Firestore.
 * @param {string} diseaseId - O ID da doença a ser excluída.
 * @returns {Promise<void>} Uma promessa que resolve quando a doença é excluída.
 */
async function deleteDisease(diseaseId) {
  try {
    await db.collection('tb_diseases').doc(diseaseId).delete();
  } catch (error) {
    console.error(`Erro ao excluir doença: ${error.message}`);
    throw new Error(`Erro ao excluir doença: ${error.message}`);
  }
}

module.exports = { getDiseases, getDiseaseById, createDisease, updateDisease, deleteDisease };
