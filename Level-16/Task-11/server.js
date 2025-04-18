import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, PNG, GIF) are allowed!'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/upload', upload.single('file'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('No file was uploaded or invalid file type');
  }

  res.send(`
    <h1>File Uploaded Successfully!</h1>
    <h2>File Details:</h2>
    <p><strong>Original Name:</strong> ${req.file.originalname}</p>
    <p><strong>Saved As:</strong> ${req.file.filename}</p>
    <p><strong>Size:</strong> ${(req.file.size / 1024).toFixed(2)} KB</p>
    <p><strong>MIME Type:</strong> ${req.file.mimetype}</p>
    ${req.file.mimetype.startsWith('image/') ? 
      `<img src="/uploads/${req.file.filename}" alt="Uploaded image" style="max-width: 500px;">` : ''}
    <p><a href="/">Upload another file</a></p>
  `);
}, (err, req, res, next) => {
  res.status(400).send(`
    <h1>Upload Error</h1>
    <p>${err.message}</p>
    <a href="/">Try again</a>
  `);
});

app.use('/uploads', express.static(uploadDir));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Upload directory: ${uploadDir}`);
});