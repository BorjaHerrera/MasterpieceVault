const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'MasterpieceVault',
    allowedFormats: ['jpg', 'jpeg', 'png', 'webp']
  }
});

/*
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    
    const mainFolder = 'MasterpieceVault';

    let subFolder = '';

    if (req.body.type === 'artist') {
      subFolder = 'artists';
    } else if (req.body.type === 'painting') {
      subFolder = 'paintings';
    }

    return {
      folder: `${mainFolder}/${subFolder}`,
      allowedFormats: ['jpg', 'jpeg', 'png', 'webp']
    };
  }
});
*/

const upload = multer({ storage: storage });
module.exports = upload;
