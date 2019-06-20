import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
base = 'http://localhost:5000/api/auth/';
jwtHelper = new JwtHelperService();
jwtDecoded :any;
logged = new EventEmitter<boolean>();
constructor(private http: HttpClient) { }
login(model: any) {
  return this.http.post(this.base + 'login', model).pipe(map((response: any) => {
    const user = response;
    if (user) {
      localStorage.setItem('token', user.token);
      this.jwtDecoded = this.jwtHelper.decodeToken(user.token);
      console.log(this.jwtDecoded);
    }
  }));
}
register (model:any)
{
  return this.http.post(this.base + 'register', model);
}
loggedIn() {
  const token = localStorage.getItem('token');
  this.logged.emit(!this.jwtHelper.isTokenExpired(token));
  return !this.jwtHelper.isTokenExpired(token);
}
}
