import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  otpurl=`http://localhost:4100/otp`
  messageUrl=`http://localhost:4100/message`
  validateUrl=`http://localhost:4100/message/validate`
  constructor(private http:HttpClient) { }
  
  sendOtp(data:any)
  {
    return this.http.post(this.otpurl,data);
  }
  verifyOtp(otp:any,email:any)
  {
    return this.http.get(`${this.otpurl}/${otp}/${email}`)
  }
  updatePassword(data:any)
  {
    return this.http.put(this.otpurl,data);
  }
  sendMessage(email:any)
  {
    return this.http.get(`${this.messageUrl}/${email}`)
  }
  resetPassword(data1:any)
  {
    console.log(data1.key);
    return this.http.post(`${this.messageUrl}`,data1)
  }
  onValidate(data:any)
  {
    return this.http.post(`${this.validateUrl}`,data)
  }
}
