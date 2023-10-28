import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { AppService } from './app.service';

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
  commonNames: string[] = ["fungi","abiotic"]
  public errors: WebcamInitError[] = [];
  croppedImage: any = '';
  isCroppedImage: boolean= false;
  checkObjects: string[] = ["plant","leaf","grass"];
  isPlant: boolean = false;
  constructor(private app: AppService){

  }
  
  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }
  
  public reset(){
    this.webcamImage = null;
    this.isCroppedImage = false;
    this.show = false;
  }
  ImageCropped(event:any){
    this.croppedImage = event;
    this.isCroppedImage=true;
    this.app.detectLabels(this.croppedImage).subscribe((data:any)=>{
      this.isPlant = false;
      data.responses[0].labelAnnotations.every((x:any)=>{
        var plant = this.checkObjects.filter((y:any)=>x.description.toLowerCase().includes(y))
        if(plant.length>0){
          this.isPlant = true;
          return false;
        }
        else{
          return true;
        }
      })
      if(!this.isPlant){
       this.reset();
       window.alert("Please upload leaf image");
      }

    })
  }
  public analyze(){
    this.diseases = null;
      this.app.analyseLeaf(this.webcamImage.imageAsDataUrl).subscribe((data:any)=>{
        data.result.disease.suggestions.every((x:any) => {
          if(this.commonNames.indexOf(x.name.toLowerCase()) == -1){
            this.diseases = x;
            return false;
          } else return true;
        });
        this.show = true;
      })
    }
}