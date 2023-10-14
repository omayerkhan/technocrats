import { Component } from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showWebcam = true;
  allowCameraSwitch = true;
  multipleWebcamsAvailable = false;
  deviceId: string = '';
  private trigger: Subject<void> = new Subject<void>();
  webcamImage: any = null;
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  diseases: any = [];
  show: boolean = false;
  diseaseName: string ='';
  diseaseDescription: string= '';
  remedies: string = ''
  public errors: WebcamInitError[] = [];
  constructor(){

  }
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
    this.webcamImage = webcamImage;
  }
  public intializeError(error: WebcamInitError): void {
    this.errors.push(error);
  }
  public analyze(){

  }
}