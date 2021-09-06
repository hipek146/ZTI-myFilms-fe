import {Component, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user-service";
import {AuthService} from "../../services/auth-service";
import {NotificationsService} from "../../services/notifications-service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  tab: 'login' | 'register' = 'login';

  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  registerForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
  });

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
              private userService: UserService,
              private authService: AuthService,
              private notificationsService: NotificationsService) {

  }

  ngOnInit() {
  }

  toggle(newTab: 'login' | 'register') {
    if (newTab !== this.tab) {
      this.tab = newTab;
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.tab === 'register' && this.registerForm.valid) {
      this.userService.signUp(this.registerForm.value).subscribe(() => {
        this.notificationsService.success("Rejestracja przebiegła pomyślnie");
        this.dialogRef.close();
      }, (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.notificationsService.danger("Taki użytkownik już istnieje");
          this.registerForm.setValue({...this.registerForm.value, login: '', password: ''})
        } else {
          this.notificationsService.danger("Wystąpł błąd");
        }
      });
    }
    else if (this.loginForm.valid) {
      this.authService.authenticate(this.loginForm.value).subscribe(() => {
        this.notificationsService.success("Pomyślnie zalogowano");
        this.dialogRef.close();
      }, (error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 404) {
          this.notificationsService.danger("Nieprawidłowy login lub hasło");
          this.loginForm.setValue({login: '', password: ''});
        } else {
          this.notificationsService.danger("Wystąpł błąd");
        }
      });
    }
  }
}
