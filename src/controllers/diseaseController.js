// controllers/diseaseController.js
const Disease = require('../models/Disease');

/**
 * Obtém todas as doenças.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
async function getDiseases(req, res) {
  try {
    const diseases = await Disease.getDiseases();
    res.json({
      success: true,
      message: 'Doenças recuperadas com sucesso!',
      data: diseases
    });
  } catch (err) {
    console.error('Erro ao recuperar doenças:', err);
    res.status(500).send(`Algo de errado aconteceu ao recuperar doenças: ${err.message}`);
  }
}

/**
 * Obtém uma doença por ID.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
async function getDiseaseById(req, res) {
  const { id } = req.params; // Assume que o ID da doença vem dos parâmetros da URL
  try {
    const disease = await Disease.getDiseaseById(id);
    if (!disease) {
      return res.status(404).json({ success: false, message: 'Doença não encontrada.' });
    }
    res.json({
      success: true,
      message: `Doença ${id} recuperada com sucesso!`,
      data: disease
    });
  } catch (err) {
    console.error(`Erro ao recuperar doença ${id}:`, err);
    res.status(500).send(`Algo de errado aconteceu ao recuperar doença: ${err.message}`);
  }
}

/**
 * Cria um novo registro de doença.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
async function createDisease(req, res) {
  const { sintomas, nomeDoenca, faixaEtaria, recomendacoes } = req.body;
  try {
    if (!nomeDoenca || !sintomas || !faixaEtaria) {
      return res.status(400).json({ success: false, message: 'Nome da doença, sintomas e faixa etária são obrigatórios.' });
    }
    const newDiseaseId = await Disease.createDisease({ sintomas, nomeDoenca, faixaEtaria, recomendacoes });
    res.status(201).json({
      success: true,
      message: 'Registro de doença criado com sucesso!',
      diseaseId: newDiseaseId
    });
  } catch (err) {
    console.error('Erro ao criar registro de doença:', err);
    res.status(500).send(`Erro ao criar registro de doença: ${err.message}`);
  }
}

/**
 * Atualiza um registro de doença existente.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
async function updateDisease(req, res) {
  const { id } = req.params; // Assume que o ID da doença vem dos parâmetros da URL
  const updates = req.body; // Os campos a serem atualizados vêm do corpo da requisição
  try {
    const diseaseExists = await Disease.getDiseaseById(id);
    if (!diseaseExists) {
      return res.status(404).json({ success: false, message: 'Doença não encontrada para atualização.' });
    }
    await Disease.updateDisease(id, updates);
    res.json({
      success: true,
      message: `Doença ${id} atualizada com sucesso!`
    });
  } catch (err) {
    console.error(`Erro ao atualizar doença ${id}:`, err);
    res.status(500).send(`Erro ao atualizar doença: ${err.message}`);
  }
}

/**
 * Exclui um registro de doença.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
async function deleteDisease(req, res) {
  const { id } = req.params; // Assume que o ID da doença vem dos parâmetros da URL
  try {
    const diseaseExists = await Disease.getDiseaseById(id);
    if (!diseaseExists) {
      return res.status(404).json({ success: false, message: 'Doença não encontrada para exclusão.' });
    }
    await Disease.deleteDisease(id);
    res.json({
      success: true,
      message: `Doença ${id} excluída com sucesso!`
    });
  } catch (err) {
    console.error(`Erro ao excluir doença ${id}:`, err);
    res.status(500).send(`Erro ao excluir doença: ${err.message}`);
  }
}

module.exports = {
  getDiseases,
  getDiseaseById,
  createDisease,
  updateDisease,
  deleteDisease,
};
