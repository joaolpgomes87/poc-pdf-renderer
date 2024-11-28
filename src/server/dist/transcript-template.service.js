"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranscriptTemplateService = void 0;
class TranscriptTemplateService {
    generateTemplate(transcript) {
        return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          
          .page {
            page-break-before: always;
            position: relative;
            padding: 20px;
          }
          
          .page:first-child {
            page-break-before: avoid;
          }
          
          .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 2px solid #1a5f7a;
            padding-bottom: 20px;
          }
          
          .transcript-info {
            margin-bottom: 40px;
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 10px;
            margin-bottom: 30px;
          }
          
          .info-label {
            font-weight: bold;
            color: #1a5f7a;
          }
          
          .endorsements {
            margin-top: 40px;
          }
          
          .endorsement {
            border: 1px solid #ddd;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
            background-color: #f9f9f9;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .endorsement:before {
            content: '';
            display: block;
            height: 0;
            page-break-before: auto;
          }
          
          .endorsement-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
          }
          
          .endorsement-name {
            font-weight: bold;
            color: #1a5f7a;
          }
          
          .endorsement-date {
            color: #666;
          }
          
          .endorsement-description {
            margin-top: 10px;
            color: #555;
          }
          
          h1, h2, h3 {
            page-break-after: avoid;
            break-after: avoid;
          }
          
          .watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 96px;
            opacity: 0.1;
            z-index: 1000;
            pointer-events: none;
            color: #000;
            white-space: nowrap;
          }

          .endorsements-section {
            page-break-before: auto;
            break-before: auto;
          }

          .endorsement:not(:last-child) {
            margin-bottom: 30px;
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="watermark">Preview Transcript</div>
          
          <div class="header">
            <h1>Preview Transcript</h1>
            <h2>${transcript.issued_for}</h2>
          </div>
          
          <div class="transcript-info">
            <div class="info-grid">
              <div class="info-label">Transcript ID:</div>
              <div>${transcript.id}</div>
              
              <div class="info-label">Issued To:</div>
              <div>${transcript.issued_to}</div>
              
              <div class="info-label">Email:</div>
              <div>${transcript.email}</div>
            </div>
          </div>
          
          <div class="endorsements-section">
            <h3>Endorsements</h3>
            ${transcript.endorsements.map(endorsement => `
              <div class="endorsement">
                <div class="endorsement-header">
                  <span class="endorsement-name">${endorsement.name}</span>
                  <span class="endorsement-date">${new Date(endorsement.date).toLocaleDateString()}</span>
                </div>
                <div>
                  <strong>Issuer:</strong> ${endorsement.issuer}
                </div>
                <div class="endorsement-description">
                  ${endorsement.description}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </body>
      </html>
    `;
    }
}
exports.TranscriptTemplateService = TranscriptTemplateService;
