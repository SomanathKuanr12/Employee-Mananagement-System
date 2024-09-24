import { Component, OnInit } from '@angular/core';
import { SwUpdateService } from './Services/sw-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private updateService:SwUpdateService){}
  ngOnInit(): void {
    this.updateService.checkForUpdate().subscribe((res)=>{
      if(res==true)
        {
          console.log("new version available");
          
          const x=confirm("A new version available")
          console.log(x);
          if(x)
            { 
              window.location.reload();
            }   
        }
        else if(res==false)
          {
            console.log("letest version");
            
          }
          else{
            console.log("error in updateing");
            
          }
    })
  }
  
}
