const { db, admin } = require('../config/firebase');

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
    throw new Error(`Erro ao obter artigos: ${error.message}`);
  }
}

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

async function createArticle({ title, body, tags, banner}) {
  try {
    const reference = db.collection('tb_articles').doc();

    await reference.set({
      title,
      body,
      tags: tags || [],
      banner,
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
    });

    return reference.id;
  } catch (error) {
    console.error(`Erro ao criar artigo: ${error.message}`);
    throw new Error(`Erro ao criar artigo: ${error.message}`);
  }
}

async function updateArticle(articleId, updates) {
  try {
    const articleRef = db.collection('tb_articles').doc(articleId);

    updates.updatedAt = admin.firestore.Timestamp.now();

    await articleRef.update(updates);
  } catch (error) {
    console.error(`Erro ao atualizar artigo: ${error.message}`);
    throw new Error(`Erro ao atualizar artigo: ${error.message}`);
  }
}

async function deleteArticle(articleId) {
  try {
    await db.collection('tb_articles').doc(articleId).delete();
  } catch (error) {
    console.error(`Erro ao excluir artigo: ${error.message}`);
    throw new Error(`Erro ao excluir artigo: ${error.message}`);
  }
}

module.exports = { 
  getArticles, 
  getArticleById, 
  createArticle, 
  updateArticle, 
  deleteArticle
};
