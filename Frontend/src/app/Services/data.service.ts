import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  LogInEmail=''
  getEmail():any{ 
  return this.LogInEmail
  }
  currentOtpEmail=''
  getOtpEmail():any{
    return this.currentOtpEmail
  }
}
