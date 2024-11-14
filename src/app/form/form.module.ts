import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageFormComponent } from './image-form/image-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ImageFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule, 
  ],
  exports: [
    ImageFormComponent
  ]
})
export class FormModule { }
