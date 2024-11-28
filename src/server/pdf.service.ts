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
          '--disable-extensions',
          '--headless'
        ]
      });

      const page = await browser.newPage();
      
      // Block ALL resource requests except document
      await page.setRequestInterception(true);
      page.on('request', (request) => {
        if (request.resourceType() === 'document') {
          request.continue();
        } else {
          request.abort();
        }
      });

      await page.setContent(html, { 
        waitUntil: 'domcontentloaded',
        timeout: 10000
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