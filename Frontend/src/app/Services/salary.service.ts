import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(private http:HttpClient) { }
  getUrl=`http://localhost:4100/salary/get`
  getData(email:any){
    return this.http.get(`${this.getUrl}/${email}`)
  }
}
