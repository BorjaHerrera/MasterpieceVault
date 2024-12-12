const { isAdmin } = require('../../middlewares/Auth');
const upload = require('../../middlewares/file');
const { parseObjectIdFields } = require('../../middlewares/parseObjectId');
const {
  getPaintingbyId,
  getPaintingbyName,
  getPaintings,
  postPainting,
  putPainting,
  deletePainting
} = require('../controllers/paintings');

const paintingRoutes = require('express').Router();

paintingRoutes.get('/nombre/:name', getPaintingbyName);
paintingRoutes.get('/:id', getPaintingbyId);
paintingRoutes.get('/', getPaintings);
paintingRoutes.post(
  '/',
  [isAdmin, parseObjectIdFields(['artist'])],
  upload.single('image'),
  postPainting
);
paintingRoutes.put(
  '/:id',
  [isAdmin, parseObjectIdFields(['artist'])],
  upload.single('image'),
  putPainting
);

paintingRoutes.delete('/:id', [isAdmin], deletePainting);

module.exports = paintingRoutes;
