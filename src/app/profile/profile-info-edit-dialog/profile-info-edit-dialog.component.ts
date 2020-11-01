import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-profile-info-edit-dialog',
  templateUrl: './profile-info-edit-dialog.component.html',
  styleUrls: ['./profile-info-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileInfoEditDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
