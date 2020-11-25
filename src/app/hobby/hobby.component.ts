import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ProfileService } from '../profile/profile.service';
import { Location } from '@angular/common';
import { Hobby } from '../profile/models/hobby.model';

@Component({
  selector: 'app-hobby',
  templateUrl: './hobby.component.html',
  styleUrls: ['./hobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HobbyComponent implements OnInit {

  hobby: Hobby;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private location: Location,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getHobby();
  }

  private getHobby(): void {
    this.route.params.pipe(
      switchMap(params => this.profileService.getHobby(params.hobby)),
      tap(hobby => {
        this.location.replaceState(hobby.name);
        this.hobby = hobby;
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      }),
    ).subscribe();
  }

}
