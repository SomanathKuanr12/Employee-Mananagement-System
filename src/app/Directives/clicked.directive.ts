import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appClicked]'
})
export class ClickedDirective implements OnInit{

  constructor(private elementRef:ElementRef) { }
  ngOnInit(): void {
    this.elementRef.nativeElement.style.color='rgb(122, 245, 200)'
    
  }
  @HostListener('click')onClick(){   
    this.elementRef.nativeElement.style.color='blue'
  }
  @HostListener('mouseenter')onMouseEnter()
  {
    this.elementRef.nativeElement.style.color='green'
  }
  @HostListener('mouseout')onMouseOut()
  {
    this.elementRef.nativeElement.style.color='rgb(122, 245, 200)'
  }

}
