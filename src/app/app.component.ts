import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth-service";
import {User} from "./interfaces/User";
import {Store} from "./core/store";
import {Router} from "@angular/router";
import {Location} from '@angular/common'
import {NotificationsService} from "./services/notifications-service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user!: User | null;

  constructor(private authService: AuthService,
              private store: Store,
              public router: Router,
              private location: Location,
              private notificationsService: NotificationsService) {
    this.store.userChanged.subscribe(() => {
      this.user = this.store.user;
    })
  }


  ngOnInit() {
    this.authService.init();
  }

  signOut() {
    this.authService.signOut();
    this.notificationsService.success("Wylogowano");
  }

  back() {
    this.location.back();
  }
}
