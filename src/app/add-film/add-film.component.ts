import {Component, OnInit} from "@angular/core";
import {MatDialog} from '@angular/material/dialog';
import {AddFilmDialogComponent} from "./add-film-dialog/add-film-dialog.component";
import {Location} from '@angular/common';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'add-film',
  templateUrl: './add-film.component.html'
})
export class AddFilmComponent implements OnInit {

  constructor(public dialog: MatDialog, private location: Location, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    const dialogRef = this.dialog.open(AddFilmDialogComponent, {data: {id}});
    dialogRef.afterClosed().subscribe(() => {
      this.location.back();
    });
  }

}
