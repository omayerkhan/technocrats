import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'app-remedies',
    templateUrl: './remedies.component.html',
    styleUrls: ['./remedies.component.scss']
  })
  export class RemediesComponent implements OnChanges,OnInit{
   
    @Input('diseases') diseases: any;
    @Input('audio') audio: any;
    @Input('healthy') healthy:boolean = false;
    @ViewChild('audioElement') audioElement: ElementRef | undefined;
    healthyText: string = ''
    constructor( private translate:TranslateService){}
  ngOnInit(): void {
    this.healthyText= this.healthy ? 'Suggestions':'Remedies';
  }
    ngOnChanges(changes: SimpleChanges): void {
      this.audioElement?.nativeElement.load();  
      this.audioElement?.nativeElement.pause();
    }
    resetAudio() {
      this.audioElement?.nativeElement.load();  
      this.audioElement?.nativeElement.pause();
    }
  }
  