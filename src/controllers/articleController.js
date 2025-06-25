// controllers/articleController.js
const Article = require('../models/Article');

/**
 * Obtém todos os artigos.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
async function getArticles(req, res) {
  try {
    const articles = await Article.getArticles();
    res.json({
      success: true,
      message: 'Artigos recuperados com sucesso!',
      data: articles
    });
  } catch (err) {
    console.error('Erro ao recuperar artigos:', err);
    res.status(500).send(`Algo de errado aconteceu ao recuperar artigos: ${err.message}`);
  }
}

/**
 * Obtém um artigo por ID.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
async function getArticleById(req, res) {
  const { id } = req.params; // Assume que o ID do artigo vem dos parâmetros da URL
  try {
    const article = await Article.getArticleById(id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Artigo não encontrado.' });
    }
    res.json({
      success: true,
      message: `Artigo ${id} recuperado com sucesso!`,
      data: article
    });
  } catch (err) {
    console.error(`Erro ao recuperar artigo ${id}:`, err);
    res.status(500).send(`Algo de errado aconteceu ao recuperar artigo: ${err.message}`);
  }
}

/**
 * Cria um novo artigo.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
async function createArticle(req, res) {
  console.log("criando artigo");
  const { title, body, tags } = req.body;
  try {
    if (!title || !body) {
      return res.status(400).json({ success: false, message: 'Título e corpo do artigo são obrigatórios.' });
    }
    const newArticleId = await Article.createArticle({ title, body, tags });
    res.status(201).json({
      success: true,
      message: 'Artigo registrado com sucesso!',
      articleId: newArticleId
    });
  } catch (err) {
    console.error('Erro ao criar artigo:', err);
    res.status(500).send(`Erro ao criar artigo: ${err.message}`);
  }
}

/**
 * Atualiza um artigo existente.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
async function updateArticle(req, res) {
  const { id } = req.params; // Assume que o ID do artigo vem dos parâmetros da URL
  const updates = req.body; // Os campos a serem atualizados vêm do corpo da requisição
  try {
    const articleExists = await Article.getArticleById(id);
    if (!articleExists) {
      return res.status(404).json({ success: false, message: 'Artigo não encontrado para atualização.' });
    }
    await Article.updateArticle(id, updates);
    res.json({
      success: true,
      message: `Artigo ${id} atualizado com sucesso!`
    });
  } catch (err) {
    console.error(`Erro ao atualizar artigo ${id}:`, err);
    res.status(500).send(`Erro ao atualizar artigo: ${err.message}`);
  }
}

/**
 * Exclui um artigo.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
async function deleteArticle(req, res) {
  const { id } = req.params; // Assume que o ID do artigo vem dos parâmetros da URL
  try {
    const articleExists = await Article.getArticleById(id);
    if (!articleExists) {
      return res.status(404).json({ success: false, message: 'Artigo não encontrado para exclusão.' });
    }
    await Article.deleteArticle(id);
    res.json({
      success: true,
      message: `Artigo ${id} excluído com sucesso!`
    });
  } catch (err) {
    console.error(`Erro ao excluir artigo ${id}:`, err);
    res.status(500).send(`Erro ao excluir artigo: ${err.message}`);
  }
}

module.exports = {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
