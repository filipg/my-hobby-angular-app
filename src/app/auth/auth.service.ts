import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  signup(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.api}/auth/signup`, {
      username,
      password
    });
  }

  signin(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.api}/auth/signin`, {
      username,
      password
    }).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getUserBaseInfo(): Observable<{ _id: string, username: string }> {
    return this.http.get<{ _id: string, username: string }>(`${environment.api}/auth/me`);
  }
}
