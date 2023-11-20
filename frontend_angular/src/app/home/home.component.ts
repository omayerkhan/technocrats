import { Component, EventEmitter, Output } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";

@Component({
    'selector':  'app-home',
    'templateUrl': './home.component.html',
    'styleUrls': ['./home.component.scss']
})
 
export class HomeComponent  {
    @Output() openCam = new EventEmitter<boolean>();
    @Output() image = new EventEmitter<any>();
    openWebCam(){
        this.openCam.emit(true);
    }
    uploadFile(event:any){
        this.convertFile(event.target.files[0]).subscribe((base64:any) => {
            this.image.emit(base64);
          });
    }
    convertFile(file : File) : Observable<string> {
        const result = new ReplaySubject<string>(1);
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (event:any) => result.next(btoa(event.target.result.toString()));
        return result;
      }


}