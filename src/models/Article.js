const { db, admin } = require('../config/firebase');

/**
 * @typedef {Object} Article
 * @property {string} id - O ID único do artigo.
 * @property {string} title - O título do artigo.
 * @property {string} body - O corpo do artigo.
 * @property {string[]} tags - Um array de tags associadas ao artigo.
 * @property {firebase.firestore.Timestamp} createdAt - A data e hora de criação do artigo.
 * @property {firebase.firestore.Timestamp} updatedAt - A data e hora da última atualização do artigo.
 */

/**
 * Obtém todos os artigos do Firestore.
 * @returns {Promise<Article[]>} Uma promessa que resolve para um array de objetos de artigo.
 */
async function getArticles() {
  try {
    const articlesSnapshot = await db.collection('tb_articles').get();
    const articles = [];

    for (const articleDoc of articlesSnapshot.docs) {
      const articleData = articleDoc.data();
      articles.push({
        id: articleDoc.id,
        ...articleData,
      });
    }

    return articles;
  } catch (error) {
    console.error(`Erro ao obter artigos: ${error.message}`);
    // Em um ambiente de produção, você pode querer lançar o erro ou lidar com ele de forma mais robusta.
    throw new Error(`Erro ao obter artigos: ${error.message}`);
  }
}

/**
 * Obtém um único artigo pelo seu ID.
 * @param {string} articleId - O ID do artigo a ser obtido.
 * @returns {Promise<Article|null>} Uma promessa que resolve para o objeto do artigo ou null se não for encontrado.
 */
async function getArticleById(articleId) {
  try {
    const articleRef = db.collection('tb_articles').doc(articleId);
    const articleDoc = await articleRef.get();

    if (!articleDoc.exists) {
      return null;
    }

    return {
      id: articleDoc.id,
      ...articleDoc.data(),
    };
  } catch (error) {
    console.error(`Erro ao obter artigo por ID: ${error.message}`);
    throw new Error(`Erro ao obter artigo por ID: ${error.message}`);
  }
}

/**
 * Cria um novo artigo no Firestore.
 * @param {Object} data - Os dados do novo artigo.
 * @param {string} data.title - O título do artigo.
 * @param {string} data.body - O corpo do artigo.
 * @param {string[]} data.tags - Um array de tags.
 * @returns {Promise<string>} Uma promessa que resolve para o ID do artigo recém-criado.
 */
async function createArticle({ title, body, tags }) {
  try {
    const reference = db.collection('tb_articles').doc();

    await reference.set({
      title,
      body,
      tags: tags || [], // Garante que tags seja um array, mesmo que vazio
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
    });

    return reference.id;
  } catch (error) {
    console.error(`Erro ao criar artigo: ${error.message}`);
    throw new Error(`Erro ao criar artigo: ${error.message}`);
  }
}

/**
 * Atualiza um artigo existente no Firestore.
 * @param {string} articleId - O ID do artigo a ser atualizado.
 * @param {Object} updates - Os campos a serem atualizados.
 * @param {string} [updates.title] - Novo título.
 * @param {string} [updates.body] - Novo corpo.
 * @param {string[]} [updates.tags] - Novas tags.
 * @returns {Promise<void>} Uma promessa que resolve quando o artigo é atualizado.
 */
async function updateArticle(articleId, updates) {
  try {
    const articleRef = db.collection('tb_articles').doc(articleId);

    // Adiciona o timestamp de atualização
    updates.updatedAt = admin.firestore.Timestamp.now();

    await articleRef.update(updates);
  } catch (error) {
    console.error(`Erro ao atualizar artigo: ${error.message}`);
    throw new Error(`Erro ao atualizar artigo: ${error.message}`);
  }
}

/**
 * Exclui um artigo do Firestore.
 * @param {string} articleId - O ID do artigo a ser excluído.
 * @returns {Promise<void>} Uma promessa que resolve quando o artigo é excluído.
 */
async function deleteArticle(articleId) {
  try {
    await db.collection('tb_articles').doc(articleId).delete();
  } catch (error) {
    console.error(`Erro ao excluir artigo: ${error.message}`);
    throw new Error(`Erro ao excluir artigo: ${error.message}`);
  }
}

module.exports = { getArticles, getArticleById, createArticle, updateArticle, deleteArticle };
