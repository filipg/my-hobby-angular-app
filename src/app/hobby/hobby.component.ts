import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-hobby',
  templateUrl: './hobby.component.html',
  styleUrls: ['./hobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HobbyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
