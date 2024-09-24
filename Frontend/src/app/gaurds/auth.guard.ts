
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, CanActivate ,Router } from '@angular/router';
 
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,OnInit {
  currentSegment:any
  constructor(private router : Router,private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {

  }

   type=''
  canActivate(): boolean {
    
    if (sessionStorage.getItem('token') !=null && sessionStorage.getItem('role')=='admin') {
      return true;
    } 
    else{
      this.router.navigate(['Home']);
      return false;
    }
    }
  }

 




