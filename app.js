require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin: process.env.origin || '*'
}));

app.use(express.json());

const userRouter = require('./src/routes/userRoutes');
const authRouter = require('./src/routes/authRoutes');
const articleRouter = require('./src/routes/articleRoutes');
const diseaseRouter = require('./src/routes/diseaseRoutes');

app.use('/', authRouter);
app.use('/', userRouter);
app.use('/', articleRouter);
app.use('/', diseaseRouter);

module.exports = app;
