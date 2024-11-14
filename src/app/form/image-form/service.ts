import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriveService {

  private apiUrl = 'http://127.0.0.1:5000/drive/upload';
  private downloadUrl = 'http://127.0.0.1:5000/drive/download'; 

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<{ fileId: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ fileId: string }>(this.apiUrl, formData)
      .pipe(
        catchError(this.handleError)
      );
  }
  downloadImage(fileId: string) {
    return this.http.get(`${this.downloadUrl}/${fileId}`, { responseType: 'blob' });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la solicitud:', error);
    return throwError('Error al subir la imagen. Inténtalo de nuevo más tarde.');
  }
}
