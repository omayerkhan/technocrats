import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { AppService } from './app.service';
import { ModalComponent } from './modal/modal.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  healthyPlant: boolean = false;
  selectedLanguage:string="en";
  languages:any = [{code:'en',name:'English'},{code:'fr',name:'French'}]
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
  private dynamicModalInstance: ModalComponent | null = null;
 
  @ViewChild('dynamicModal', { static: false })
  set dynamicModal(value: ModalComponent) {
    if (value) {
      this.dynamicModalInstance = value;
      const componentInstance = this.dynamicModalInstance.openComponent(LoginComponent);
      componentInstance.loggedIn.subscribe((data:any) => {
        this.loggedIn = true;
        this.dynamicModalInstance?.close();
      });
    }
  }
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
    changeLanguage(event:any){
      this.selectedLanguage=event.target.value;
        
        this.app.changeLanguage(this.diseases,event.target.value,'name').subscribe((data:any)=>{
          this.diseases.name = data.data.translations[0].translatedText;
          this.diseases.details.description = data.data.translations[1].translatedText;
          sessionStorage.setItem(this.selectedLanguage,JSON.stringify(this.diseases));
          
        })
        if(this.diseases.details.treatment?.biological){
         
          this.app.changeLanguage(this.diseases,event.target.value,'biological').subscribe((data:any)=>{
            this.diseases.details.treatment.biological = [];
   
            data.data.translations.map((x:any)=>{
              this.diseases.details.treatment.biological.push(x.translatedText)
              sessionStorage.setItem(this.selectedLanguage,JSON.stringify(this.diseases))
              
            })
          })
        }
        if(this.diseases.details.treatment?.chemical){
          
          this.app.changeLanguage(this.diseases,event.target.value,'chemical').subscribe((data:any)=>{
            this.diseases.details.treatment.chemical = [];
            data.data.translations.map((x:any)=>{
              this.diseases.details.treatment.chemical.push(x.translatedText)
              sessionStorage.setItem(this.selectedLanguage,JSON.stringify(this.diseases))
              
            })
           
          })
        }
        if(this.diseases.details.treatment?.prevention){
          
          this.app.changeLanguage(this.diseases,event.target.value,'prevention').subscribe((data:any)=>{
            this.diseases.details.treatment.prevention = [];
            data.data.translations.map((x:any)=>{
              this.diseases.details.treatment.prevention.push(x.translatedText)
              sessionStorage.setItem(this.selectedLanguage,JSON.stringify(this.diseases))
              
            })
           
          })
        }
       
      
     
    }
}