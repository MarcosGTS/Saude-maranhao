const Hospital = require('../models/Hospital');

async function getHospital(req, res) {
  const { id } = req.params; // Assume que o UID do usuário vem dos parâmetros da URL
  try {
    const hospital = await Hospital.getHospital(id);
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital não encontrado.' });
    }
    res.json({
      success: true,
      message: `Hospital ${id} recuperado com sucesso!`,
      data: hospital 
    });
  } catch (err) {
    console.error(`Erro ao recuperar Hospital ${id}:`, err);
    res.status(500).send(`Algo de errado aconteceu ao recuperar Hospital: ${err.message}`);
  }
}

async function getAllHospitals(req, res) {
  try {
    const hospitals = await Hospital.getAllHospitals();
    res.json({
      success: true,
      message: `Hospitais recuperado com sucesso!`,
      data: hospitals
    });
  } catch (err) {
    console.error(`Erro ao recuperar Hospitais:`, err);
    res.status(500).send(`Algo de errado aconteceu ao recuperar os Hospitais: ${err.message}`);
  }
}

module.exports = {
    getHospital,
    getAllHospitals,
}