import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(username: string, password: string) {
    return this.http.post(`${environment.api}/auth/signup`, {
      username,
      password
    });
  }

  signin(username: string, password: string) {
    return this.http.post(`${environment.api}/auth/signin`, {
      username,
      password
    });
  }
}
