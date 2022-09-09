import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs'; //handle Asyncronyx and responses

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://127.0.0.1:8000";
  readonly PhotoUrl = "http://127.0.0.1:8000/media/";


  constructor(private http:HttpClient) { }


  // Department API
  getDepList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/department/');
  }

  addDepList(val:any){
    return this.http.post(this.APIUrl + '/department/' , val);
  }

  updateDepList(val:any){
    return this.http.put(this.APIUrl + '/department/' , val);
  }

  deleteDepList(val:any){
    return this.http.delete(this.APIUrl + '/department/'+ val);
  }

  // Employee API
  getEmpList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/employee/');
  }

  addEmpList(val:any){
    return this.http.post(this.APIUrl + '/employee/' , val);
  }

  updateEmpList(val:any){
    return this.http.put(this.APIUrl + '/employee/' , val);
  }

  deleteEmpList(val:any){
    return this.http.delete(this.APIUrl + '/employee/'+val);
  }


  UploadPhoto(val:any){
    return this.http.post(this.APIUrl + '/savefile/' , val);
  }



}
