import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileModel } from './models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Hobby } from './models/hobby.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  addProfileInfo(profile: ProfileModel): Observable<void> {
    return this.http.post<void>(`${environment.api}/profile`, profile);
  }

  getProfileInfo(id: string): Observable<ProfileModel> {
    return this.http.get<ProfileModel>(`${environment.api}/profile/${id}`);
  }

  updateProfileInfo(id: string, profile: ProfileModel): Observable<ProfileModel> {
    return this.http.patch<ProfileModel>(`${environment.api}/profile/${id}`, profile);
  }

  // later to move to hobby.service.ts
  getHobbies(): Observable<Hobby[]> {
    return this.http.get<Hobby[]>(`${environment.api}/hobby`);
  }
}
