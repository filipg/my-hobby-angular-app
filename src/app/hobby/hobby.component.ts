import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Hobby } from '../profile/models/hobby.model';
import { HobbyService } from './hobby.service';
import { faEdit, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { HobbyEventsEditDialogComponent } from './hobby-events-edit-dialog/hobby-events-edit-dialog.component';

@Component({
  selector: 'app-hobby',
  templateUrl: './hobby.component.html',
  styleUrls: ['./hobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HobbyComponent implements OnInit {

  hobby: Hobby;
  editIcon: IconDefinition = faEdit;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private hobbyService: HobbyService,
    private location: Location,
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getHobby();
  }

  private getHobby(): void {
    this.route.params.pipe(
      switchMap(params => this.hobbyService.getHobby(params.hobby)),
      tap(hobby => {
        // this.location.replaceState(hobby.name);
        this.hobby = hobby;
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      }),
    ).subscribe();
  }

  addEvent(): void {
    const dialogRef = this.dialog.open(HobbyEventsEditDialogComponent, {
      width: '500px',
      data: this.hobby._id
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.hobby.events.push(data.data);
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  takePart(event: Event): void {
    console.log(event);
  }
}
