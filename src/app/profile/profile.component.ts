import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { faEdit, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ProfileInfoEditDialogComponent } from './profile-info-edit-dialog/profile-info-edit-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  editIcon: IconDefinition = faEdit;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  editProfileInfo(): void {
    this.dialog.open(ProfileInfoEditDialogComponent, {
      width: '500px'
    });
  }

  editProfileHobbies(): void {
    console.log('Edit profile hobbies');
  }
}
