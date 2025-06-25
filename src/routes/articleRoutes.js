// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
// const { authenticateToken, checkRoleMiddleware } = require('../utils/permissions');

// router.use(authenticateToken);
router.get('/articles/', articleController.getArticles);
router.get('/articles/:id', articleController.getArticleById);
// router.post('/articles/', checkRoleMiddleware(['admin', 'editor']), articleController.createArticle);
router.post('/articles/', articleController.createArticle);
router.put('/articles/:id', articleController.updateArticle);
router.delete('/articles/:id', articleController.deleteArticle);

module.exports = router;
