import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http:HttpClient) { }
  putUrl=`http://localhost:4100/attendance/update`
  getUrl=`http://localhost:4100/attendance/get`
  getData(email:any)
  {
    return this.http.get(`${this.getUrl}/${email}`)
  }
  onUpdate(data:any){
    console.log(data.totalPresent);
   return this.http.put(this.putUrl,data)
  }
}
