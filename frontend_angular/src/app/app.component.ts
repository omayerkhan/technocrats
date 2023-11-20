import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { AppService } from './app.service';
import { ModalComponent } from './modal/modal.component';
import { LoginComponent } from './login/login.component';
import { TranslateService } from '@ngx-translate/core';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  btnClicked: boolean = false;
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
  audio: any
  @ViewChild('homeModal', {static: false})
 set homeModal(value: ModalComponent){
  if(value){
    this.dynamicModalInstance = value;
    const componentInstance = this.dynamicModalInstance.openComponent(HomeComponent);
    componentInstance.openCam.subscribe((data:any)=>{
      this.btnClicked = true;
    })
    componentInstance.image.subscribe((data:any)=>{
      this.webcamImage = "data:image/jpeg;base64," + data;
      this.btnClicked = true;
    })
  }
 }

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
  constructor(private app: AppService, private translate:TranslateService){
    this.translate.addLangs(this.languages);
    this.translate.setDefaultLang('en');
 
    const browserLang = this.translate.getBrowserLang();
    this.translate.use('en');
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
    this.webcamImage = webcamImage.imageAsDataUrl;
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
      this.app.analyseLeaf(this.webcamImage).subscribe((data:any)=>{
        this.diseases= null;
        if(data.result.is_healthy.binary && (data.result.is_healthy.probability>0.5)){
          this.healthyPlant = true;;
        }
        data.result.disease.suggestions.every((x:any) => {
          if(this.commonNames.indexOf(x.name.toLowerCase()) == -1){
            this.diseases = x;
            sessionStorage.setItem(this.selectedLanguage,JSON.stringify(this.diseases));
            return false;
          } else return true;
        });
        this.textToSpeech();
        this.show = true;
      })
    }
    changeLanguage(event:any){
      this.selectedLanguage=event.target.value;
      this.translate.use(event.target.value);

      if(!sessionStorage.getItem(this.selectedLanguage)){
      
                    
        this.app.changeLanguage(this.diseases,event.target.value,'name').subscribe((data:any)=>{
          this.diseases.name = data.data.translations[0].translatedText;
          this.diseases.details.description = data.data.translations[1].translatedText;
          sessionStorage.setItem(this.selectedLanguage,JSON.stringify(this.diseases))
        this.textToSpeech();
          
        })
        if(this.diseases.details.treatment?.biological){
         
          this.app.changeLanguage(this.diseases,event.target.value,'biological').subscribe((data:any)=>{
            this.diseases.details.treatment.biological = [];
   
            data.data.translations.map((x:any)=>{
              this.diseases.details.treatment.biological.push(x.translatedText)
              sessionStorage.setItem(this.selectedLanguage,JSON.stringify(this.diseases))
              this.textToSpeech();
              
            })
          })
        }
        if(this.diseases.details.treatment?.chemical){
          
          this.app.changeLanguage(this.diseases,event.target.value,'chemical').subscribe((data:any)=>{
            this.diseases.details.treatment.chemical = [];
            data.data.translations.map((x:any)=>{
              this.diseases.details.treatment.chemical.push(x.translatedText)
              sessionStorage.setItem(this.selectedLanguage,JSON.stringify(this.diseases))
             this.textToSpeech();
              
            })
           
          })
        }
        if(this.diseases.details.treatment?.prevention){
          
          this.app.changeLanguage(this.diseases,event.target.value,'prevention').subscribe((data:any)=>{
            this.diseases.details.treatment.prevention = [];
            data.data.translations.map((x:any)=>{
              this.diseases.details.treatment.prevention.push(x.translatedText)
              sessionStorage.setItem(this.selectedLanguage,JSON.stringify(this.diseases))
              this.textToSpeech();             
            })
           
          })
        }
        }
        else{
          this.diseases = JSON.parse(sessionStorage.getItem(this.selectedLanguage)||'');
          this.textToSpeech();
        }
       
    }
   
    textToSpeech(){
      if(!sessionStorage.getItem(this.selectedLanguage+"input")){
      const keysToTranslate = ['DiseaseName', 'Description', 'Remedies', 'Biological', 'Chemical','Prevention'];
      let voice = ''
      this.translate.get(keysToTranslate).subscribe((res: any) => {
        voice = res['DiseaseName'] + "," + this.diseases.name + "." + res['Description'] + "," + this.diseases.details?.description + "." + res['Remedies'] + ",";
        if(this.diseases.details?.treatment){
          if(this.diseases.details.treatment?.biological){
            voice = voice + res['Biological'];
            this.diseases.details.treatment?.biological.map((x:any)=>{
              voice = voice + x;
            })
          }
          if(this.diseases.details.treatment?.chemical){
            voice = voice + res['Chemical']
            this.diseases.details.treatment?.chemical.map((x:any)=>{
              voice = voice +x;
            })
          }
          if(this.diseases.details.treatment?.prevention){
            voice = voice + res['Prevention']
            this.diseases.details.treatment?.prevention.map((x:any)=>{
              voice = voice +x;
            })
          }
        }
        
       this.app.textToSpeech(voice).subscribe((data:any)=>{
          this.audio = 'data:audio/mp3;base64,' + data.audioContent;
          sessionStorage.setItem(this.selectedLanguage+"input",this.audio)
          
         })
  
      });
       
    }
    else{
      this.audio = sessionStorage.getItem(this.selectedLanguage+"input");
    }
  }
}