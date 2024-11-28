"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfController = void 0;
const express_1 = require("express");
const pdf_service_1 = require("./pdf.service");
class PdfController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.pdfService = new pdf_service_1.PdfService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/preview-pdf', async (req, res) => {
            try {
                const pdfBuffer = await this.pdfService.generatePdf(req.body);
                res.type('application/pdf');
                res.send(pdfBuffer);
            }
            catch (error) {
                console.error('PDF Generation Error:', error);
                res.status(500).json({ error: 'Failed to generate PDF' });
            }
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.PdfController = PdfController;
