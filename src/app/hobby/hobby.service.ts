import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hobby } from '../profile/models/hobby.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HobbyService {

  constructor(private http: HttpClient) { }

  getHobbies(): Observable<Hobby[]> {
    return this.http.get<Hobby[]>(`${environment.api}/hobby`);
  }

  getHobby(id: string): Observable<Hobby> {
    return this.http.get<Hobby>(`${environment.api}/hobby/${id}`);
  }
}
