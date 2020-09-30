import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }
  forgotPassword(data): Observable<any>{
    return this.http.post(baseUrl+'forgot-password', {
      email_user: data.email_user
    }, httpOptions);
  }
  /*resetPasswordget(data): Observable<any>{
    return this.http.get(`${baseUrl}reset-password`,data);
  }*/
  resetPassword(data,Param1,Param2): Observable<any>{
    let params = new HttpParams();
    params = params.append('email_user', Param1);
    params = params.append('token', Param2);
    return this.http.post(`${baseUrl}reset-password`,data,{ params: params });
  }
}
