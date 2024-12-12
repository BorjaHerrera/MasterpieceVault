const { deleteFile } = require('../../utils/deleteFile');
const Painting = require('../models/paintings');

const getPaintings = async (req, res, next) => {
  try {
    const paintings = await Painting.find().populate('artist');
    return res.status(200).json(paintings);
  } catch (error) {
    console.log(error);

    return res.status(400).json('Error en la solicitud Get Paintings.');
  }
};

const getPaintingbyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const painting = await Painting.findById(id).populate('artist');
    return res.status(200).json(painting);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Get by Id');
  }
};

const getPaintingbyName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const painting = await Painting.find({ name: name }).populate('artist');
    return res.status(200).json(painting);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Get by Name');
  }
};

const postPainting = async (req, res, next) => {
  try {
    const { title, artist } = req.params;
    const existingPainting = await Painting.findOne({ title, artist });

    if (existingPainting) {
      return res.status(400).json({ message: 'Error: Este cuadro ya existe' });
    }
    const newPainting = new Painting(req.body);
    if (req.file) {
      newPainting.image = req.file.path;
    }
    const paintingSaved = await newPainting.save();
    return res.status(201).json(paintingSaved);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Post Painting');
  }
};

const putPainting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newPainting = new Painting(req.body);
    newPainting._id = id;

    if (req.file) {
      newPainting.image = req.file.path;
      const oldPainting = await Painting.findById(id);
      deleteFile(oldPainting.image);
    }

    const updatedPainting = await Painting.findByIdAndUpdate(id, newPainting, {
      new: true
    });
    return res.status(200).json(updatedPainting);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Put Painting');
  }
};

const deletePainting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletePainting = await Painting.findByIdAndDelete(id);
    deleteFile(deletePainting.image);
    return res.status(200).json(deletePainting);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Delete Painting');
  }
};

module.exports = {
  getPaintings,
  getPaintingbyId,
  getPaintingbyName,
  postPainting,
  putPainting,
  deletePainting
};
