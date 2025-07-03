// routes/articleRoutes.js
const multer = require('multer');
const express = require('express');
const path = require('path');
const router = express.Router();
const articleController = require('../controllers/articleController');
// const { authenticateToken, checkRoleMiddleware } = require('../utils/permissions');

// Multer config – save to local temporarily
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, __dirname + '../../../uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// router.use(authenticateToken);
router.get('/articles/', express.json(), articleController.getArticles);
router.get('/articles/:id', express.json() ,articleController.getArticleById);
// router.post('/articles/', checkRoleMiddleware(['admin', 'editor']), articleController.createArticle);
router.post('/articles/', upload.single('banner'), articleController.createArticle);
router.put('/articles/:id', express.json(), articleController.updateArticle);
router.delete('/articles/:id', express.json(), articleController.deleteArticle);

module.exports = router;
