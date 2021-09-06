import {EventEmitter, Injectable} from "@angular/core";
import {User} from "../interfaces/User";

@Injectable({
  providedIn: 'root',
})
export class Store {
  filmsChanged = new EventEmitter<void>()
  userChanged = new EventEmitter<void>()

  user!: User | null;
}
