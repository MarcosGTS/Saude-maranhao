const cloudinary = require('cloudinary').v2;
const cloudinaryService = JSON.parse(process.env.CLOUDINARY_CONFIG);

 // Configuration
cloudinary.config(cloudinaryService);

module.exports = { cloudinary };
