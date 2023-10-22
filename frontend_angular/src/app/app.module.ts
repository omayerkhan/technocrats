import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WebcamModule } from 'ngx-webcam';
import { HttpClientModule } from '@angular/common/http';
import { WebCamComponent } from './web-cam/web.cam.component';
import { RemediesComponent } from './remedies/remedies.component';
import { AppService } from './app.service';
@NgModule({
  declarations: [
    AppComponent,
    WebCamComponent,
    RemediesComponent
  ],
  imports: [
    BrowserModule,
    WebcamModule,
    HttpClientModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
