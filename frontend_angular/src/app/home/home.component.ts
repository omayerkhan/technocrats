import { Component, EventEmitter, Output } from "@angular/core";

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


}