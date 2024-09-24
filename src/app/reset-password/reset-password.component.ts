import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OtpService } from '../Services/otp.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  message = ''
  errMassage = ''
  isValidate=false;
  encryptedEmail = ''
  key = ''

  data1 = {
    email: '',
    key: '',
    password: ''
  }
  isUpdated = false
  isAlreadyUpdated = false;
  constructor(private route: ActivatedRoute, private otpService: OtpService) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const encryptedEmail = params['encryptedEmail'];
      const key = params['key'];
      this.data1.email = encryptedEmail
      this.data1.key = key
      const data={
        email:encryptedEmail,
        key:key
      }
      this.otpService.onValidate(data).subscribe((res:any)=>{
        if(res){       
        this.isValidate=res;
        }
      },(Error: HttpErrorResponse) => {
        {  
            this.errMassage = Error.error.message
            setTimeout(() => {
              this.errMassage = '';
            }, 3000)
          }      
      })
    });
  }



  confirmPassword: any;


  onUpdate() {
    if (this.data1.password != this.confirmPassword) {
      this.errMassage = "New password and Confirm password does not match"
    }
    else {
      this.otpService.resetPassword(this.data1).subscribe((res: any) => {
        if (res == true) {
          this.isUpdated = true;
        }
      }, (Error: HttpErrorResponse) => {
        {  
            this.errMassage = Error.error.message
            setTimeout(() => {
              this.errMassage = '';
            }, 3000)
          }
        
      })
    }
  }

}
