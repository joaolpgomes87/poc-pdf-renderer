import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transcript } from '../server/types/transcript';

@Injectable({
  providedIn: 'root'
})
export class PdfGenerationService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/api';


  async generateServerPdf(transcript: Transcript): Promise<string> {
    try {
      const response = await this.http
        .post(`${this.API_URL}/preview-pdf`, transcript, {
          responseType: 'blob'
        })
        .toPromise();

      if (!response) {
        throw new Error('No response from server');
      }

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(response);
      });

    } catch (error) {
      console.error('Server PDF Generation Error:', error);
      throw error;
    }
  }
}
