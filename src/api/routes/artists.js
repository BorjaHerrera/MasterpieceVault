const { isAdmin } = require('../../middlewares/Auth');
const upload = require('../../middlewares/file');
const { parseObjectIdFields } = require('../../middlewares/parseObjectId');
const {
  getArtist,
  getArtistById,
  getArtistByName,
  postArtist,
  putArtist,
  deleteArtist
} = require('../controllers/artists');

const artistsRoutes = require('express').Router();

artistsRoutes.get('/:id', getArtistById);
artistsRoutes.get('/nombre/:name', getArtistByName);
artistsRoutes.get('/', getArtist);
artistsRoutes.post(
  '/',
  [isAdmin, parseObjectIdFields(['paintings'])],
  upload.single('image'),
  postArtist
);
artistsRoutes.put(
  '/:id',
  [isAdmin, parseObjectIdFields(['paintings'])],
  upload.single('image'),
  putArtist
);
artistsRoutes.delete('/:id', [isAdmin], deleteArtist);

module.exports = artistsRoutes;
