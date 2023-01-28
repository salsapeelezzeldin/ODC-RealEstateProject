import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  baseUrl = "http://localhost:3000/api"
  isLoggedIn = false

  constructor(private http : HttpClient) { }

  login(obj:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/login`, obj)
  }

  getSingleProject(projId:any):Observable<any>{
    return this.http.get(`http://localhost:3000/api/project/singleProject/${projId}`)
  }


  get(url: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${url}`);
  }
  post(url: string, data: any, headers: any = {}) {
    if (Object.keys(headers).length > 0)
      return this.http.post<any>(`${this.baseUrl}${url}`, data, headers);
    return this.http.post<any>(`${this.baseUrl}${url}`, data);
  }
  edit(url: string, data: any, headers: any = {}) {
    if (Object.keys(headers).length > 0)
      return this.http.patch<any>(`${this.baseUrl}${url}`, data, headers);
    return this.http.patch<any>(`${this.baseUrl}${url}`, data);
  }
  delete(url: string, data: object = {}) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.http.delete<any>(`${this.baseUrl}${url}`, options);
  }
}
