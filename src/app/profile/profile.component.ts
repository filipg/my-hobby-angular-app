import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { faEdit, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  editIcon: IconDefinition = faEdit;

  constructor() { }

  ngOnInit(): void {
  }

  editProfileInfo(): void {
    console.log('Edit profile info');
  }

  editProfileHobbies(): void {
    console.log('Edit profile hobbies');
  }
}
