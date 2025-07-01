const { db, admin } = require('../config/firebase');

async function getHospital(hospitalId) {
  try {
    const hospitalRef = db.collection('tb_hospitals').doc(hospitalId);
    const doc = await hospitalRef.get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error('Erro ao obter perfil do hospital:', error.message);
    throw new Error(`Erro ao obter perfil do hospital: ${error.message}`);
  }
}

async function getAllHospitals() {
  try {
    const hospitalsSnapshot = await db.collection('tb_hospitals').get();
    const hospitals = [];

    hospitalsSnapshot.forEach(doc => {
      hospitals.push({ id: doc.id, ...doc.data() });
    });

    return hospitals;
  } catch (error) {
    console.error('Erro ao obter hospitais:', error.message);
    throw new Error(`Erro ao obter hospitais: ${error.message}`);
  }
}

module.exports =  {
    getHospital,
    getAllHospitals,
}