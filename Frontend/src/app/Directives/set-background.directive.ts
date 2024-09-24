import { Directive, ElementRef,  OnInit } from '@angular/core';

@Directive({
  selector: '[appSetBackground]'
})
export class SetBackgroundDirective implements OnInit{

  constructor(private elemenRef:ElementRef) { }
  ngOnInit(){
    this.elemenRef.nativeElement.style.backgroundColor='yellow';
    this.elemenRef.nativeElement.style.color='blue';
    
  }
  
}
