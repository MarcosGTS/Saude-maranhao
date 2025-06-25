// app.js (Exemplo de Aplicação Express)
const express = require('express');
const bodyParser = require('body-parser');
const { auth } = require('./src/config/firebase'); // Importa 'auth' do Admin SDK
const authService = require('./src/controllers/authService'); // Funções de Auth do Admin SDK
const userModel = require('./src/models/User'); // CRUD para perfil do usuário no Firestore
const { authenticateToken, checkRoleMiddleware } = require('./src/utils/permissions');

const app = express();
app.use(bodyParser.json());

// Exemplo de rota pública (sem autenticação)
app.get('/api/public', (req, res) => {
  res.send('Este é um endpoint público.');
});

// Rotas de Autenticação (Acesso público para registrar/logar)
app.post('/api/register', async (req, res) => {
  const { email, password, displayName } = req.body;
  try {
    const userRecord = await authService.createUser(email, password, displayName);
    res.status(201).send({ uid: userRecord.uid, email: userRecord.email, displayName: userRecord.displayName });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Nota: Para login, o cliente (frontend) usará o Firebase Client SDK (signInWithEmailAndPassword)
// e enviará o ID Token resultante para as rotas protegidas do backend.
// Não há uma rota de '/api/login' para o Admin SDK neste contexto, pois o login é feito no cliente.

// Exemplo de rota protegida que exige autenticação
app.get('/api/protected', authenticateToken, (req, res) => {
  // req.user contém o token decodificado e o perfil (se anexado)
  res.send(`Olá, ${req.user.profile.displayName || req.user.email}! Você acessou uma rota protegida. Suas roles: ${req.user.roles.join(', ')}`);
});

// Exemplo de rota que exige permissão de 'admin'
app.get('/api/admin-dashboard', authenticateToken, checkRoleMiddleware(['admin']), (req, res) => {
  res.send(`Bem-vindo ao dashboard de administrador, ${req.user.profile.displayName}!`);
});

// Exemplo de rota que exige permissão de 'editor' ou 'admin'
app.post('/api/create-content', authenticateToken, checkRoleMiddleware(['admin', 'editor']), async (req, res) => {
  // Lógica para criar conteúdo
  res.status(201).send('Conteúdo criado com sucesso!');
});

// Exemplo de rota para atualizar roles de um usuário (apenas para admins)
app.post('/api/users/:uid/roles', authenticateToken, checkRoleMiddleware(['admin']), async (req, res) => {
  const { uid } = req.params;
  const { roles } = req.body; // roles deve ser um array de strings

  if (!Array.isArray(roles)) {
    return res.status(400).send('Roles devem ser um array.');
  }

  try {
    await authService.setUserRoles(uid, roles);
    // Opcional: Sincronize o perfil do Firestore após atualizar as claims
    await userModel.updateUserProfile(uid, { roles: roles });
    res.send(`Roles para o usuário ${uid} atualizadas para: ${roles.join(', ')}`);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log('Certifique-se de que "serviceAccountKey.json" está na pasta "config/" e seguro.');
});
