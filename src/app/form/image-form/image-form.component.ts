import { Component } from '@angular/core';
import { DriveService } from './service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.css']
})
export class ImageFormComponent {
  fileName: string = '';
  previewUrl: string | ArrayBuffer | null | undefined = null;
  file: File | null = null;
  fileId: string = '';
  searchFileId: string = '';
  searchFileName: string = '';
  searchFileUrl: string | null = null;

  constructor(private driveService: DriveService) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.file = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSaveImage(): void {
    if (this.file) {
      this.driveService.uploadImage(this.file).subscribe(
        (response: any) => {
          this.fileId = response.google_drive_url.split('id=')[1]; 
          Swal.fire('Imagen subida con éxito', `ID: ${this.fileId}`, 'success');
        },
        error => {
          console.error('Error al subir la imagen:', error);
        }
      );
    }
  }

  onDownloadImage(): void {
    if (this.fileId) {
      this.driveService.downloadImage(this.fileId).subscribe(
        (blob) => {
          const downloadUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = `${this.fileName}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        },
        error => {
          console.error('Error al descargar la imagen:', error);
        }
      );
    } else {
      console.warn('No se ha subido ninguna imagen para descargar.');
    }
  }

  onSearchImage(): void {
    if (this.searchFileId) {
      this.driveService.downloadImage(this.searchFileId).subscribe(
        (blob) => {
          this.searchFileName = `${this.searchFileId}.jpg`;
          this.searchFileUrl = window.URL.createObjectURL(blob);
        },
        error => {
          console.error('Error al buscar la imagen:', error);
          Swal.fire('Error', 'No se encontró la imagen con el ID proporcionado.', 'error');
        }
      );
    }
  }
}
