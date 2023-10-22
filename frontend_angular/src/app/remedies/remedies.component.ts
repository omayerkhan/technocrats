import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-remedies',
    templateUrl: './remedies.component.html',
    styleUrls: ['./remedies.component.scss']
  })
  export class RemediesComponent {
    @Input('diseases') diseases: any;
  }