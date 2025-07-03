require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin: process.env.origin || '*'
}));

const userRouter = require('./src/routes/userRoutes');
const authRouter = require('./src/routes/authRoutes');
const articleRouter = require('./src/routes/articleRoutes');
const diseaseRouter = require('./src/routes/diseaseRoutes');
const hospitalRouter = require('./src/routes/hospitalRoutes');

app.use('/', authRouter);
app.use('/', userRouter);
app.use('/', articleRouter);
app.use('/', diseaseRouter);
app.use('/', hospitalRouter);

module.exports = app;
