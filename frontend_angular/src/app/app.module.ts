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
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
const firebaseConfig = {
  apiKey: "AIzaSyCkzoGGXc8NXuerTPD40uNlBLUp7eBVayU",
  authDomain: "plantdisease-17e2d.firebaseapp.com",
  projectId: "plantdisease-17e2d",
  storageBucket: "plantdisease-17e2d.appspot.com",
  messagingSenderId: "162451718880",
  appId: "1:162451718880:web:ee916c31ab1f941cb14685",
  measurementId: "G-T527LKZPMD"
};
@NgModule({
  declarations: [
    AppComponent,
    WebCamComponent,
    RemediesComponent,
    CropComponent,
    LoginComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    WebcamModule,
    HttpClientModule,
    ImageCropperModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
