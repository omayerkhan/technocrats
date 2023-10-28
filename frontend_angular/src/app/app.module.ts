import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WebcamModule } from 'ngx-webcam';
import { HttpClientModule } from '@angular/common/http';
import { WebCamComponent } from './web-cam/web.cam.component';
import { RemediesComponent } from './remedies/remedies.component';
import { AppService } from './app.service';
import { CropComponent } from './crop/crop.component';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({
  declarations: [
    AppComponent,
    WebCamComponent,
    RemediesComponent,
    CropComponent
  ],
  imports: [
    BrowserModule,
    WebcamModule,
    HttpClientModule,
    ImageCropperModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
