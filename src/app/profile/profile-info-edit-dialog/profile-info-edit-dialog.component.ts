import { Component, OnInit, ChangeDetectionStrategy, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileModel } from '../models';
import { ProfileService } from '../profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-info-edit-dialog',
  templateUrl: './profile-info-edit-dialog.component.html',
  styleUrls: ['./profile-info-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileInfoEditDialogComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProfileInfoEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileModel,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      description: [this.data.description],
      phone: [this.data.phone],
      email: [this.data.email]
    });
  }

  onSubmit(): void {
    this.subscription = this.profileService.updateProfileInfo(this.data._id, {
      _id: this.data._id,
      description: this.form.value.description,
      phone: this.form.value.phone,
      email: this.form.value.email
    }).subscribe(data => {
      this.dialogRef.close({data});
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
