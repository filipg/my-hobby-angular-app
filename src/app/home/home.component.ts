import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  user$ = this.authService.getUserBaseInfo();

  constructor(private authService: AuthService) { }
}
