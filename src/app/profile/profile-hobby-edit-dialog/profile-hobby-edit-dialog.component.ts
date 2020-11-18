import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileService } from '../profile.service';
import { Hobby } from '../models/hobby.model';

@Component({
  selector: 'app-profile-hobby-edit-dialog',
  templateUrl: './profile-hobby-edit-dialog.component.html',
  styleUrls: ['./profile-hobby-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileHobbyEditDialogComponent implements OnInit {

  form: FormGroup;
  hobbies: Hobby[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProfileHobbyEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[],
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      hobbies: []
    });
  }

  onSubmit(): void {
    console.log(this.form.value);
    // this.profileService.updateProfileInfo(this.data._id, {}).subscribe(data => {
    //   this.dialogRef.close({data});
    // });
  }
}
