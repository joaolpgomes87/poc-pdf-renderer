import cors from 'cors';
import express from 'express';
import { PdfService } from './pdf.service';
import { Transcript } from './types/transcript';

const app = express();
const pdfService = new PdfService();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: false
}));

app.use(express.json());

app.post('/api/preview-pdf', async (req, res) => {
  try {
    const transcript = req.body as Transcript;
    
    const pdfBuffer = await pdfService.generatePdf(transcript);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdfBuffer.length,
    });
    
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF Generation Error:', error);
    res.status(500).json({ 
      error: 'PDF Generation failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 