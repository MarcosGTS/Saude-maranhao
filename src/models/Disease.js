const { db, admin } = require('../config/firebase');

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
    throw new Error(`Erro ao obter doenças: ${error.message}`);
  }
}

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

async function updateDisease(diseaseId, updates) {
  try {
    const diseaseRef = db.collection('tb_diseases').doc(diseaseId);

    updates.updatedAt = admin.firestore.Timestamp.now();

    await diseaseRef.update(updates);
  } catch (error) {
    console.error(`Erro ao atualizar doença: ${error.message}`);
    throw new Error(`Erro ao atualizar doença: ${error.message}`);
  }
}

async function deleteDisease(diseaseId) {
  try {
    await db.collection('tb_diseases').doc(diseaseId).delete();
  } catch (error) {
    console.error(`Erro ao excluir doença: ${error.message}`);
    throw new Error(`Erro ao excluir doença: ${error.message}`);
  }
}

module.exports = { 
  getDiseases, 
  getDiseaseById, 
  createDisease, 
  updateDisease, 
  deleteDisease 
};
