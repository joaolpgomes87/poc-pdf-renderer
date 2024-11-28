import { Router } from 'express';
import { PdfService } from './pdf.service';

export class PdfController {
  private router: Router;
  private pdfService: PdfService;

  constructor() {
    this.router = Router();
    this.pdfService = new PdfService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/preview-pdf', async (req, res) => {
      try {
        const pdfBuffer = await this.pdfService.generatePdf(req.body);
        res.type('application/pdf');
        res.send(pdfBuffer);
      } catch (error) {
        console.error('PDF Generation Error:', error);
        res.status(500).json({ error: 'Failed to generate PDF' });
      }
    });
  }

  getRouter() {
    return this.router;
  }
} 