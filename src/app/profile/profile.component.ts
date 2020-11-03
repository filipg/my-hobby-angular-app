import { Component, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { faEdit, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ProfileInfoEditDialogComponent } from './profile-info-edit-dialog/profile-info-edit-dialog.component';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from './profile.service';
import { Subscription, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ProfileModel } from './models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {

  profile: ProfileModel;
  editIcon: IconDefinition = faEdit;
  subscription: Subscription;
  loading = false;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getProfileInfo();
  }

  private getProfileInfo(): void {
    this.subscription = this.authService.getUserBaseInfo().pipe(
      switchMap(user => this.profileService.getProfileInfo(user._id)),
      tap(data => {
        this.profile = data;
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
    console.log('Edit profile hobbies');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
