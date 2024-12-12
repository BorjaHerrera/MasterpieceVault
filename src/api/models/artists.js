const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, trim: true },
    image: { type: String, require: false, trim: true },
    paintings: [
      { type: mongoose.Types.ObjectId, ref: 'paintings', required: false }
    ],
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
        'Modernismo',
        'Neoclasicismo',
        'Romanticismo',
        'Art Nouveau',
        'Pop Art'
      ]
    },
    nationality: { type: String, require: true, trim: true }
  },
  {
    timestamps: true,
    collection: 'artists'
  }
);

const Artist = mongoose.model('artists', artistSchema, 'artists');

module.exports = Artist;
