import puppeteer from 'puppeteer';
import { TranscriptTemplateService } from './transcript-template.service';
import { Transcript } from './types/transcript';

export class PdfService {
  private templateService: TranscriptTemplateService;

  constructor() {
    this.templateService = new TranscriptTemplateService();
  }

  async generatePdf(transcript: Transcript): Promise<Buffer> {
    let browser;
    try {
      const html = this.templateService.generateTemplate(transcript);
      console.log('Generated HTML template');

      browser = await puppeteer.launch({
        headless: "new",
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--disable-extensions'
        ]
      });

      const page = await browser.newPage();
      
      // Optimize page performance
      await page.setRequestInterception(true);
      page.on('request', (request) => {
        if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
          request.continue();
        } else {
          request.abort();
        }
      });

      await page.setContent(html, { 
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Generate PDF with existing settings
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px'
        }
      });

      return pdf;

    } catch (error) {
      console.error('PDF Generation Error:', error);
      throw error;
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
} 