import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HobbyService } from '../hobby.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../auth/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hobby-events-edit-dialog',
  templateUrl: './hobby-events-edit-dialog.component.html',
  styleUrls: ['./hobby-events-edit-dialog.component.scss']
})
export class HobbyEventsEditDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<HobbyEventsEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private hobbyService: HobbyService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.authService.getUserBaseInfo().pipe(
      switchMap(user => {
        return this.hobbyService.addEvent(this.data, {
          id: '1',
          name: this.form.value.name,
          description: this.form.value.description,
          userCreator: user.username,
          date: this.form.value.date,
          time: this.form.value.time,
          participants: []
        });
      })
    ).subscribe(data => {
      this.dialogRef.close({data});
    });
  }
}
