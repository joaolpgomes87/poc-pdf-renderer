"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const pdf_controller_1 = require("./pdf.controller");
const app = (0, express_1.default)();
const port = 3000;
// Enable CORS for the Angular frontend
app.use((0, cors_1.default)());
// Increase payload limit for large HTML content
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
const pdfController = new pdf_controller_1.PdfController();
// PDF generation endpoint
app.post('/api/preview-pdf', (req, res) => pdfController.generatePreviewPdf(req, res));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
