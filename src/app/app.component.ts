import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { sampleTranscript } from '../server/mock/sample-transcript';
import { PdfGenerationService } from './pdf-generation.service';

@Component({
  selector: 'app-root',
  imports:[CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private pdfService = inject(PdfGenerationService);
  private sanitizer = inject(DomSanitizer);

  pdfSrc: SafeResourceUrl | null = null;
  showPdf = false;


  async generateServerPdf() {
    try {
      const pdfDataUrl = await this.pdfService.generateServerPdf(sampleTranscript);
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(pdfDataUrl);
      this.showPdf = true;
    } catch (error) {
      console.error('Error generating server PDF:', error);
    }
  }
}
