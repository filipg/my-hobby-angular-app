import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ProfileService } from '../../profile/profile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  showError = false;
  showSuccess = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.authService.signup(this.form.value.username, this.form.value.password)
      .pipe(
        tap(() => this.showSuccess = true),
        switchMap(user => this.profileService.addProfileInfo({
          _id: user._id,
          description: '',
          phone: '',
          email: '',
          hobbies: []
        })),
        catchError(e => throwError(e))
      ).subscribe(() => {}, error => {
        console.log(error);
        this.showError = true;
    });
  }
}
