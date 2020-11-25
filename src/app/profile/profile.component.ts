import { Component, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { faEdit, faEnvelope, faPhone, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ProfileInfoEditDialogComponent } from './profile-info-edit-dialog/profile-info-edit-dialog.component';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from './profile.service';
import { Subscription, throwError, zip } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ProfileModel } from './models';
import { ProfileHobbyEditDialogComponent } from './profile-hobby-edit-dialog/profile-hobby-edit-dialog.component';
import { HobbyService } from '../hobby/hobby.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {

  user$ = this.authService.getUserBaseInfo();
  profile: ProfileModel;
  hobbies$;
  editIcon: IconDefinition = faEdit;
  envelopeIcon: IconDefinition = faEnvelope;
  phoneIcon: IconDefinition = faPhone;
  subscription: Subscription;
  loading = false;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private hobbyService: HobbyService
  ) { }

  ngOnInit() {
    this.getProfileInfo();
  }

  private getProfileInfo(): void {
    this.subscription = this.authService.getUserBaseInfo().pipe(
      switchMap(user => this.profileService.getProfileInfo(user._id)),
      tap(data => {
        this.profile = data;
        const hobbiesObservable = data.hobbies.map(el => this.hobbyService.getHobby(el));
        this.hobbies$ = zip(...hobbiesObservable);
        this.loading = true;
        this.changeDetectorRef.detectChanges();
      }),
      catchError(e => throwError(e))).subscribe();
  }

  editProfileInfo(): void {
    const dialogRef = this.dialog.open(ProfileInfoEditDialogComponent, {
      width: '500px',
      data: this.profile
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.profile = data.data;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  editProfileHobbies(): void {
    const dialogRef = this.dialog.open(ProfileHobbyEditDialogComponent, {
      width: '500px',
      data: this.profile
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        if (this.profile.hobbies !== data.data.hobbies) {
          const hobbiesObservable = data.data.hobbies.map(el => this.hobbyService.getHobby(el));
          this.hobbies$ = zip(...hobbiesObservable);
        }
        this.profile = data.data;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
