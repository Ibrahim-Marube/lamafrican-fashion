import express from 'express';
import { upload } from '../config/cloudinary';

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.json({
    url: req.file.path,
    publicId: req.file.filename,
    filename: req.file.originalname,
  });
});

router.post('/upload-multiple', upload.array('images', 10), (req, res) => {
  const files = req.files as Express.Multer.File[];
  
  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  const uploadedFiles = files.map(file => ({
    url: file.path,
    publicId: file.filename,
    filename: file.originalname,
  }));

  res.json(uploadedFiles);
});

export default router;
