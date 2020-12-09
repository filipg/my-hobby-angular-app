import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from '../profile/profile.service';
import { switchMap, tap } from 'rxjs/operators';
import { of, zip } from 'rxjs';
import { Hobby } from '../profile/models/hobby.model';
import { HobbyService } from '../hobby/hobby.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  userName: string;
  hobbies: Hobby[] = [];
  loading = true;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private changeDetectorRef: ChangeDetectorRef,
    private hobbyService: HobbyService
  ) { }


  ngOnInit() {
    this.authService.getUserBaseInfo().pipe(
      tap(baseInfo => this.userName = baseInfo.username),
      switchMap(user => this.profileService.getProfileInfo(user._id)),
      switchMap(profileInfo => {
        const hobbies = profileInfo.hobbies.map(hobby => this.hobbyService.getHobby(hobby));
        return hobbies.length ? zip(...hobbies) : of([]);
      })
    ).subscribe(data => {
      this.hobbies = data;
      this.loading = false;
      this.changeDetectorRef.detectChanges();
    });
  }
}
