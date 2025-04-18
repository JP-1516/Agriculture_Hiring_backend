const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dv4kdhfot',
  api_key: '821517488575215',
  api_secret: '-obWzSjH4AGP7jBA7oCcpCGxWoM'
});

const uploadFileToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'job_applications',
      resource_type: 'auto'
    });
    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

module.exports = { uploadFileToCloudinary };