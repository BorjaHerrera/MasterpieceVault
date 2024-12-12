const mongoose = require('mongoose');

const parseObjectIdFields = (fields) => (req, res, next) => {
  try {
    for (const field of fields) {
      if (req.body[field]) {
        if (Array.isArray(req.body[field])) {
          req.body[field] = req.body[field].map((id) =>
            mongoose.Types.ObjectId(id)
          );
        } else {
          req.body[field] = mongoose.Types.ObjectId(req.body[field]);
        }
      }
    }
    next();
  } catch (error) {
    res.status(400).json('Error al convertir el string en ObjectId');
  }
};

module.exports = { parseObjectIdFields };
