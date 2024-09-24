import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appButton]'
})
export class ButtonDirective implements OnInit{

  constructor(private elementRef:ElementRef) { }
  ngOnInit(): void {
    
    this.elementRef.nativeElement.style.color='white'
    this.elementRef.nativeElement.style.backgroundcolor='007bff'
    
  }
  @HostListener('click')onClick(){
    this.elementRef.nativeElement.style.backgroundColor='green';
    this.elementRef.nativeElement.style.color='blue'
  }

}
