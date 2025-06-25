// config/firebase.js
// Certifique-se de que este arquivo já está configurado com suas credenciais Firebase.
const admin = require('firebase-admin');

// IMPORTANTE:
// 1. Baixe este arquivo do Console do Firebase:
//    Vá para Project settings -> Service accounts -> Clique em "Generate new private key".
// 2. Renomeie o arquivo baixado para 'serviceAccountKey.json' (ou o que preferir).
// 3. Coloque este arquivo em um local SEGURO no seu projeto (ex: na pasta 'config/').
//    NUNCA o exponha publicamente, especialmente em repositórios de código aberto.
// const serviceAccount = require('./serviceAccountKey.json'); // Caminho para o seu arquivo de chave
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

// Inicializa o Firebase Admin SDK apenas se ainda não foi inicializado
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: "https://inova-transporte-publico.firebaseio.com", // Opcional para Realtime Database
    // storageBucket: "inova-transporte-publico.appspot.com" // Opcional para Storage
  });
}

// Exporta as instâncias do Firestore e Authentication do Admin SDK
const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth, admin }; // Exporta 'admin' também para acesso a outras funcionalidades
