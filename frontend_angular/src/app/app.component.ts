import { HttpClient } from '@angular/common/http';
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
  diseases: any;
  show: boolean = false;
  diseaseName: string ='';
  diseaseDescription: string= '';
  remedies: string = ''
  commonNames: string[] = ["fungi","abiotic"]
  public errors: WebcamInitError[] = [];
  constructor(private http: HttpClient){

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
  public reset(){
    this.webcamImage = null;
  }
  public analyze(){

      let url ="https://plant.id/api/v3/health_assessment?details=description,treatment,classification,cause&full_disease_list=true";
      let headers = {
        "Api-Key":"372OFUbQ3G9ryG67s9xm2cuSgtPy9jsHc3067tJjUJBBqgwLlr",
        "Content-Type":"application/json"
      }
      let body ={
        "images": [
            this.webcamImage.imageAsDataUrl
        ],
        "latitude": 49.207,
        "longitude": 16.608,
        "similar_images": true
    }
    this.diseases = [];
    this.diseaseDescription = '';
    this.diseaseName = '';
    this.remedies = '';
      this.http.post(url,body,{headers}).subscribe((data:any)=>{
        data.result.disease.suggestions.forEach((x:any) => {
          if(this.commonNames.indexOf(x.name.toLowerCase()) == -1){
            this.diseases = x;
          }
        });
        this.show = true;
      })
    }
}