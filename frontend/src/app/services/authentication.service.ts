import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//const baseUrl = 'http://localhost:3000/api';
const AUTH_API = 'http://localhost:3000/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }
  /*login(data){
    return this.http.post(`${baseUrl}/login`,data);
  }
  register(user){
    return this.http.post(`${baseUrl}/register`,user);
  }*/
  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email_user: credentials.email_user,
      password_user: credentials.password_user
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      nom_user: user.nom_user,
      prenom_user: user.prenom_user,
      organisation : user.organisation,
      email_user: user.email_user,
      password_user: user.password_user
    }, httpOptions);
  }
}
