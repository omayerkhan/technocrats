import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ImageCroppedEvent, LoadedImage } from "ngx-image-cropper";
import { WebcamImage } from "ngx-webcam";

@Component({
    selector: 'app-crop',
    templateUrl: './crop.component.html',
    styleUrls: ['./crop.component.scss']
  })
  export class CropComponent {
    @Input('image') image: any;
    @Output() cropped= new EventEmitter<string | null | undefined>();
    imageLoaded(image: LoadedImage) {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }
      imageCropped(event: ImageCroppedEvent) {
        this.cropped.emit(event.base64);
       
       
    }
  }