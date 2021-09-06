import {Component, OnInit} from "@angular/core";
import {MatDialog} from '@angular/material/dialog';
import {Location} from '@angular/common';
import {ActivatedRoute, } from "@angular/router";
import {LoginDialogComponent} from "./login-dialog/login-dialog.component";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog, private location: Location, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    const dialogRef = this.dialog.open(LoginDialogComponent, {data: {id}});
    dialogRef.afterClosed().subscribe(() => {
      this.location.back();
    });
  }

}
