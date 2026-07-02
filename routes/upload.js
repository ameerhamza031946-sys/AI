const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { parseFile, computeStats } = require('../services/dataParser');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, unique);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['.csv', '.xlsx', '.xls', '.json', '.png', '.jpg', '.jpeg', '.webp'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error(`File type ${ext} not supported`), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

/**
 * POST /api/upload
 */
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const { originalname, filename, path: filePath, size, mimetype } = req.file;
    const ext = path.extname(originalname).toLowerCase();
    const isImage = ['.png', '.jpg', '.jpeg', '.webp'].includes(ext);

    if (isImage) {
      return res.json({
        success: true,
        filename: originalname,
        size,
        type: 'image',
        url: `/uploads/${filename}`,
        message: 'Image uploaded successfully. Use AI analysis for image insights.',
      });
    }

    // Parse data file
    const data = await parseFile(filePath, mimetype, originalname);
    const stats = computeStats(data);

    res.json({
      success: true,
      filename: originalname,
      size,
      type: 'data',
      rowCount: data.length,
      columns: Object.keys(data[0] || {}),
      preview: data.slice(0, 10),
      stats,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message || 'File processing failed' });
  }
});

module.exports = router;
