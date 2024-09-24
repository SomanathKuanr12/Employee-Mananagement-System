import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthConfig } from '../../auth.config';
import { HttpHeaders ,HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  constructor(private route:ActivatedRoute,private http: HttpClient,private router:Router){
    
  }
  ngOnInit(): void {
  
  }

}


