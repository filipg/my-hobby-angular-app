import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-profile-hobby-edit-dialog',
  templateUrl: './profile-hobby-edit-dialog.component.html',
  styleUrls: ['./profile-hobby-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileHobbyEditDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
