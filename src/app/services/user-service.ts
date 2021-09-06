import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/User";
import {Observable} from "rxjs";
import {server_api} from "../core/server_api";

const userApi = server_api;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  signUp(user: User): Observable<any> {
    return this.http.post(userApi + '/user', user);
  }

  getUser() {
    return this.http.get(userApi + '/user');
  }

  authenticate(credentials: {login: string, password: string}): Observable<any> {
    return this.http.post(userApi + '/authenticate', {...credentials});
  }

}
