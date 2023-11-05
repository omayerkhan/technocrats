import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  healthyPlant: boolean = false;
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
  loggedIn= false;
  constructor(private app: AppService){

  }
  ngOnInit(){
    if(localStorage.getItem('user')){
      this.loggedIn= true;
    }
  }
  LoggedIn(event:any){
    this.loggedIn = true;
  }
  
  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }
  cropped(){
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
  
  public reset(){
    this.webcamImage = null;
    this.isCroppedImage = false;
    this.show = false;
  }
  ImageCropped(event:any){
    this.croppedImage = event;
    this.isCroppedImage=true;
    
  }
  public analyze(){
    this.healthyPlant = false;
      this.app.analyseLeaf(this.webcamImage.imageAsDataUrl).subscribe((data:any)=>{
        this.diseases= null;
        if(data.result.is_healthy.binary && (data.result.is_healthy.probability>0.5)){
          this.healthyPlant = true;;
        }
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