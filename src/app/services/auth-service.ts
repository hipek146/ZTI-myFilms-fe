import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {UserService} from "./user-service";
import {Store} from "../core/store";
import {User} from "../interfaces/User";

@Injectable({providedIn: 'root'})
export class AuthService {

  private _token: string = "";

  constructor(private userService: UserService, private store: Store) {}

  init() {
    this.loadToken();
    this.restoreUser();
  }

  public getToken(): string {
    return this._token;
  }

  loadToken() {
    this._token = sessionStorage.getItem('AUTH_TOKEN') || "";
  }

  saveToken(token: string) {
    sessionStorage.setItem('AUTH_TOKEN', token);
    this._token = token;

  }

  authenticate(credentials: {login: string, password: string}): Observable<User> {
    return this.userService.authenticate(credentials).pipe(map(response => {
      const {token, ...user} = response
      this.saveToken(token);
      this.store.user = user;
      this.store.userChanged.emit();
      return user;
    }));
  }

  restoreUser() {
    if (this._token) {
      this.userService.getUser().subscribe((response: any) => {
        this.store.user = response;
        this.store.userChanged.emit();
      }, () => {
        this.signOut();
      });
    }
  }

  signOut() {
    this.store.user = null;
    this.store.userChanged.emit();
    sessionStorage.removeItem('AUTH_TOKEN');
  }
}
