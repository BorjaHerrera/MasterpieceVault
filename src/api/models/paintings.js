const mongoose = require('mongoose');

const paintingSchema = new mongoose.Schema(
  {
    title: { type: String, require: true, trim: true },
    artist: { type: mongoose.Types.ObjectId, ref: 'artists', required: true },
    image: { type: String, require: true, trim: true },
    movement: {
      type: [String],
      required: true,
      enum: [
        'Renacimiento',
        'Postimpresionismo',
        'Cubismo',
        'Impresionismo',
        'Surrealismo',
        'Expresionismo',
        'Barroco',
        'Expresionismo Abstracto',
        'Dadaísmo',
        'Simbolismo',
        'Fauvismo',
        'Realismo',
        'Neoclasicismo',
        'Romanticismo',
        'Art Nouveau',
        'Pop Art'
      ]
    }
  },
  {
    timestamps: true,
    collection: 'paintings'
  }
);

const Painting = mongoose.model('paintings', paintingSchema, 'paintings');

module.exports = Painting;
