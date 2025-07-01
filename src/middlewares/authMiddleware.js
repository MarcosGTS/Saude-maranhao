const { auth } = require('../config/firebase');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).send('Token não fornecido');

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('Token inválido');
  }
};

module.exports = verifyToken;
