const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { PdfService } = require('./dist/pdf.service.js');

const app = express();
const pdfService = new PdfService();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(express.json());

app.use('/api', (req, res, next) => {
  console.log('API request received:', req.method, req.url);
  next();
});

app.post('/api/preview-pdf', async (req, res) => {
  try {
    const transcript = req.body;
    console.log('Received transcript data:', transcript);
    
    const pdfBuffer = await pdfService.generatePdf(transcript);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdfBuffer.length,
    });
    
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF Generation Error:', error);
    res.status(500).json({ error: 'PDF Generation failed', details: error.message });
  }
});

const publicPath = path.join(__dirname, '../public/browser');
console.log('Serving static files from:', publicPath);
console.log('Directory exists:', fs.existsSync(publicPath));
console.log('Directory contents:', fs.readdirSync(publicPath));

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../public/browser/index.html');
  console.log('Trying to serve:', indexPath);
  console.log('File exists:', fs.existsSync(indexPath));
  res.sendFile(indexPath);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 