require('dotenv').config();

const express = require('express');
const { connectDB } = require('./src/confi/db');
const mainRoutes = require('./src/api/routes/main');
const { configCloudinary } = require('./src/confi/cloudinary');

const app = express();

app.use(express.json());

connectDB();
configCloudinary();

app.use('/api/v1', mainRoutes);

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found');
});

app.listen(3000, () => {
  console.log('Servidor levantado en http://localhost:3000');
});
