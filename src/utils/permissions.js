// utils/permissions.js (PARA BACKEND com Express)
const { auth } = require('../config/firebase'); // 'auth' do Admin SDK
const { getUserProfile } = require('../models/User'); // Para obter o perfil do Firestore

/**
 * Middleware para autenticar requisições usando o Firebase ID Token.
 * Anexa o objeto `decodedToken` e o `userProfile` (do Firestore) a `req.user`.
 * @returns {(req: Request, res: Response, next: NextFunction) => void}
 */
async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('Não autorizado: Token não fornecido.');
  }

  const idToken = authHeader.split('Bearer ')[1];
  if (!idToken) {
    return res.status(401).send('Não autorizado: Formato de token inválido.');
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken; // O token decodificado contém uid, email, e custom claims (se houver)

    // Opcional: Anexar o perfil completo do usuário do Firestore
    // Isso é útil se você armazena informações adicionais do perfil (como roles) no Firestore
    const userProfile = await getUserProfile(decodedToken.uid);
    if (userProfile) {
      req.user.profile = userProfile;
      // Sobrescrever as roles do token com as do perfil, se quiser que o Firestore seja a fonte primária
      // Ou mesclar, dependendo da sua estratégia.
      req.user.roles = userProfile.roles;
    } else {
      // Se não houver perfil no Firestore, garanta que roles é um array vazio ou padrão
      req.user.roles = [];
    }

    next();
  } catch (error) {
    console.error('Erro ao verificar token:', error.message);
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).send('Não autorizado: Token expirado.');
    }
    return res.status(401).send('Não autorizado: Token inválido.');
  }
}

/**
 * Verifica se um usuário possui as permissões necessárias.
 * @param {string[]} userRoles - Um array das funções (roles) que o usuário possui.
 * @param {string[]} requiredRoles - Um array das funções (roles) necessárias para a ação.
 * @returns {boolean} True se o usuário tiver pelo menos uma das funções necessárias, false caso contrário.
 */
function hasPermission(userRoles, requiredRoles) {
  if (!userRoles || userRoles.length === 0) {
    return false; // Usuário sem funções não tem permissão
  }
  if (!requiredRoles || requiredRoles.length === 0) {
    return true; // Se nenhuma função é necessária, qualquer um tem permissão
  }
  // Verifica se o usuário tem pelo menos uma das funções necessárias
  return userRoles.some(role => requiredRoles.includes(role));
}

/**
 * Middleware para Express.js para verificar permissões.
 * Assume que `req.user` foi preenchido pelo `authenticateToken` e contém `req.user.roles`.
 * @param {string[]} allowedRoles - Um array de funções permitidas para acessar a rota.
 * @returns {(req: Request, res: Response, next: NextFunction) => void}
 */
function checkRoleMiddleware(allowedRoles) {
  return (req, res, next) => {
    // req.user.roles deve ter sido definido pelo authenticateToken
    const userRoles = req.user && req.user.roles ? req.user.roles : [];

    if (hasPermission(userRoles, allowedRoles)) {
      next(); // Usuário tem permissão, continua para a próxima rota
    } else {
      res.status(403).send('Acesso negado: Você não tem permissão para realizar esta ação.');
    }
  };
}

module.exports = {
  authenticateToken,
  hasPermission,
  checkRoleMiddleware,
};

