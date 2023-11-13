import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";

@Component({
    selector: 'app-remedies',
    templateUrl: './remedies.component.html',
    styleUrls: ['./remedies.component.scss']
  })
  export class RemediesComponent implements OnChanges{
   
    @Input('diseases') diseases: any;
    @Input('audio') audio: any;
    @ViewChild('audioElement') audioElement: ElementRef | undefined;
    ngOnChanges(changes: SimpleChanges): void {
      this.audioElement?.nativeElement.load();  
      this.audioElement?.nativeElement.pause();
    }
    resetAudio() {
      this.audioElement?.nativeElement.load();  
      this.audioElement?.nativeElement.pause();
    }
  }
  