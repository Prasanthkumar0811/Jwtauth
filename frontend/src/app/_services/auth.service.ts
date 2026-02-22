import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  private apiurl='http://localhost:3000'

  login(data:any):Observable<any>{
    return this.http.post(`${this.apiurl}/login`,data)
  }
  forgot(email:string):Observable<any>{
    return this.http.post(`${this.apiurl}/forgot`,{email})
  }
  resetpass(token:string,password:string):Observable<any>{
    return this.http.post(`${this.apiurl}/reset/${token}`,{password})
  }
  getToken(){
    return localStorage.getItem('token')
  }
  LogedIn():boolean{
    return !!this.getToken()
  }
  getName():string | null{
    return localStorage.getItem('Fullname')
  }
  logout(){
    localStorage.clear()
  }
}
