import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  postRequest(url: string, data?: any): Observable<any> {
    return this.http.post(url, data)
  }

  patchRequest(url: string, data?: any): Observable<any> {
    return this.http.patch(url, data)
  }

  getRequest(url: string): Observable<any> {
    return this.http.get(url);
  }

  deleteRequest(url: string): Observable<any> {
    return this.http.delete(url);
  }
}
