import { Component, EventEmitter, Output } from "@angular/core";
import { WebcamImage, WebcamInitError } from "ngx-webcam";
import { Observable, Subject } from "rxjs";

@Component({
    selector: 'app-web-cam',
    templateUrl: './web-cam.component.html',
    styleUrls: ['./web-cam.component.scss']
  })
  export class WebCamComponent {
    @Output() image = new EventEmitter<WebcamImage>();
    showWebcam = true;
    allowCameraSwitch = true;
    multipleWebcamsAvailable = false;
    deviceId: string = '';
    private trigger: Subject<void> = new Subject<void>();
    public errors: WebcamInitError[] = [];
    private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
    public get triggerObservable(): Observable<void> {
        return this.trigger.asObservable();
      }
      public get nextWebcamObservable(): Observable<boolean|string> {
        return this.nextWebcam.asObservable();
      }
      public showNextWebcam(directionOrDeviceId: boolean|string): void {
        this.nextWebcam.next(directionOrDeviceId);
      }
      public triggerSnapshot(): void {
        this.trigger.next();
      }
      public handleImage(webcamImage: WebcamImage): void {
        
        this.image.emit(webcamImage)
      }
      public intializeError(error: WebcamInitError): void {
        this.errors.push(error);
      }
  }