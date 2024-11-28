"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const transcript_template_service_1 = require("./transcript-template.service");
class PdfService {
    constructor() {
        this.templateService = new transcript_template_service_1.TranscriptTemplateService();
    }
    async generatePdf(transcript) {
        try {
            // Generate HTML from transcript data
            const html = this.templateService.generateTemplate(transcript);
            console.log('Generated HTML:', html);
            const browser = await puppeteer_1.default.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            const page = await browser.newPage();
            await page.setContent(html, { waitUntil: 'networkidle0' });
            // Generate PDF
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
            await browser.close();
            return pdf;
        }
        catch (error) {
            console.error('PDF Generation Error:', error);
            throw error;
        }
    }
}
exports.PdfService = PdfService;
