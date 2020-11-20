import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileService } from '../profile.service';
import { Hobby } from '../models/hobby.model';
import { tap } from 'rxjs/operators';
import { ProfileModel } from '../models';

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
    @Inject(MAT_DIALOG_DATA) public data: ProfileModel,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getHobbies();
  }

  private getHobbies(): void {
    this.profileService.getHobbies().pipe(
      tap(hobbies => {
        this.hobbies = hobbies;
      })
    ).subscribe();
  }

    private createForm(): void {
    this.form = this.fb.group({
      hobbies: [this.data.hobbies]
    });
  }

  onSubmit(): void {
    this.profileService.updateProfileInfo(this.data._id, {
      _id: this.data._id,
      description: this.data.description,
      email: this.data.email,
      phone: this.data.phone,
      hobbies: this.form.value.hobbies
    }).pipe(
      tap(data => this.dialogRef.close({data}))
    ).subscribe();
  }
}
