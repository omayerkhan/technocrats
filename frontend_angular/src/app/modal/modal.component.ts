import { Component, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef } from "@angular/core";

@Component({
    'selector':  'app-modal',
    'templateUrl': './modal.component.html',
    'styleUrls': ['./modal.component.scss']
})
export class ModalComponent implements OnInit{
    @ViewChild('modalContent', { read: ViewContainerRef, static: true }) modalContent!: ViewContainerRef;
  loggedIn: boolean = false;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }
  
    openComponent<T>(component: Type<T>): T {
      this.modalContent.clear();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      const componentRef = this.modalContent.createComponent(componentFactory);
      return componentRef.instance;
    }
  
    close() {
      this.modalContent.clear();
    }
  
    ngOnDestroy() {
      this.modalContent.clear();
    }
    ngOnInit(): void {
      if(localStorage.getItem('user')){
        this.loggedIn = true;
      }
    }
    
}
 