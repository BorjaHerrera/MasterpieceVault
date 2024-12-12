const { deleteFile } = require('../../utils/deleteFile');
const Artist = require('../models/artists');

const getArtist = async (req, res, next) => {
  try {
    const artists = await Artist.find().populate('paintings');
    return res.status(200).json(artists);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Get Artists');
  }
};

const getArtistById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findById(id).populate('paintings');
    return res.status(200).json(artist);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Get Artist by Id');
  }
};

const getArtistByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const artist = await Artist.find({ name: name }).populate('paintings');
    return res.status(200).json(artist);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Get Artist by Name');
  }
};

const postArtist = async (req, res, next) => {
  try {
    const { name } = req.params;

    const existingArtist = await Artist.findOne({ name });

    if (existingArtist) {
      return res.status(400).json({ message: 'Error: Este artista ya existe' });
    }

    const newArtist = new Artist(req.body);
    if (req.file) {
      newArtist.image = req.file.path;
    }
    const artistSaved = await newArtist.save();
    return res.status(201).json(artistSaved);
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error en la solicitud Post Artist');
  }
};

const putArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { paintings, ...otherFields } = req.body;

    const updateFields = { ...otherFields };

    if (paintings && paintings.length > 0) {
      updateFields.$addToSet = { paintings: { $each: paintings } };
    }

    const updatedArtist = await Artist.findByIdAndUpdate(id, updateFields, {
      new: true
    });

    if (req.file) {
      deleteFile(updatedArtist.image);
      updatedArtist.image = req.file.path;
      await updatedArtist.save();
    }

    return res.status(201).json(updatedArtist);
  } catch (error) {
    console.log(error);

    return res.status(400).json('Error en la solicitud Put Artist');
  }
};

const deleteArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteArtist = await Artist.findByIdAndDelete(id);
    deleteFile(deleteArtist.image);
    return res.status(200).json(deleteArtist);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Delete.');
  }
};

module.exports = {
  getArtist,
  getArtistById,
  getArtistByName,
  postArtist,
  putArtist,
  deleteArtist
};
