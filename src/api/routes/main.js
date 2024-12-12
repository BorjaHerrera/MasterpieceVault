const artistsRoutes = require('./artists');
const paintingRoutes = require('./paintings');
const userRoutes = require('./users');

const mainRoutes = require('express').Router();

mainRoutes.use('/usuarios', userRoutes);
mainRoutes.use('/artistas', artistsRoutes);
mainRoutes.use('/cuadros', paintingRoutes);

module.exports = mainRoutes;
