require('dotenv').config();

const mongoose = require('mongoose');
const artistsData = require('./artistsData');
const Artist = require('../api/models/artists');

const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then(async () => {
    const artist = await Artist.find();

    if (artist.length) {
      Artist.collection.drop();
      console.log('Se ha eliminado la coleccción Artist');
    }
    await Artist.insertMany(artistsData);
    console.log('Se ha incluido la coleccción Artist del array');
  })
  .finally(() => {
    mongoose.disconnect();
    console.log('Desconectado');
  });
