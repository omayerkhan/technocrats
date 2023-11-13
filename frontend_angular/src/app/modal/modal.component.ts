import { Component, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef } from "@angular/core";

@Component({
    'selector':  'app-modal',
    'templateUrl': './modal.component.html',
    'styleUrls': ['./modal.component.scss']
})
export class ModalComponent{
    @ViewChild('modalContent', { read: ViewContainerRef, static: true }) modalContent!: ViewContainerRef;

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
    
}
 