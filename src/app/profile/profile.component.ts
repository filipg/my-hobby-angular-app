import { Component, ChangeDetectionStrategy } from '@angular/core';
import { faEdit, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ProfileInfoEditDialogComponent } from './profile-info-edit-dialog/profile-info-edit-dialog.component';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from './profile.service';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

  profile$ = this.authService.getUserBaseInfo().pipe(
    switchMap(user => this.profileService.getProfileInfo(user._id)),
    catchError(e => throwError(e)));

  editIcon: IconDefinition = faEdit;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    public dialog: MatDialog
  ) { }

  editProfileInfo(): void {
    this.dialog.open(ProfileInfoEditDialogComponent, {
      width: '500px'
    });
  }

  editProfileHobbies(): void {
    console.log('Edit profile hobbies');
  }
}
