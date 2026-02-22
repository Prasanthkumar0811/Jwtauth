import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  private baseurl='http://localhost:3000/users'

  getallusers():Observable<any>{
    return this.http.get(this.baseurl)
  }
  getusersbyid(id:string):Observable<any>{
    return this.http.get(`${this.baseurl}/${id}`)
  }
  createuser(data:any):Observable<any>{
    return this.http.post(`${this.baseurl}/add`,data)
  }
  updateuser(id:string,data:any):Observable<any>{
    return this.http.put(`${this.baseurl}/update/${id}`,data)
  }
  deleteuser(id:string):Observable<any>{
    return this.http.delete(`${this.baseurl}/${id}`)
  }
}
