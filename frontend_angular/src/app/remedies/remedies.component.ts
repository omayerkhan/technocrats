import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'app-remedies',
    templateUrl: './remedies.component.html',
    styleUrls: ['./remedies.component.scss']
  })
  export class RemediesComponent implements OnChanges{
   
    @Input('diseases') diseases: any;
    @Input('audio') audio: any;
    @ViewChild('audioElement') audioElement: ElementRef | undefined;
    constructor( private translate:TranslateService){}
    ngOnChanges(changes: SimpleChanges): void {
      this.audioElement?.nativeElement.load();  
      this.audioElement?.nativeElement.pause();
    }
    resetAudio() {
      this.audioElement?.nativeElement.load();  
      this.audioElement?.nativeElement.pause();
    }
  }
  