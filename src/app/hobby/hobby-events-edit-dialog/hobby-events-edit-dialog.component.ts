import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HobbyService } from '../hobby.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    private hobbyService: HobbyService) { }

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
    console.log(this.form.value);
    console.log(this.data);
    this.hobbyService.addEvent(this.data, {
      id: '1',
      name: this.form.value.name,
      description: this.form.value.description,
      date: this.form.value.date,
      time: this.form.value.time,
      participants: []
    }).subscribe(data => {
      this.dialogRef.close({data});
    });
  }
}
