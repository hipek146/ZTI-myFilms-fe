import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Film} from "../interfaces/Film";
import {HttpClient, HttpParams} from "@angular/common/http";
import {server_api} from "../core/server_api";

const filmsApi = server_api;

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  constructor(private http: HttpClient) {
  }

  getFilms(title?: string): Observable<Film[]> {
    let params = new HttpParams();
    if (title) {
      params = params.append('title', title);
    }
    return this.http.get<Film[]>(filmsApi + '/films', {params});
  }

  getFilm(id: number): Observable<Film> {
    return this.http.get<Film>(filmsApi + '/film/' + id);
  }

  addFilm(values: Film): Observable<any> {
    return this.http.post(filmsApi + '/film', values);
  }

  updateFilm(values: Film): Observable<any> {
    return this.http.put(filmsApi + '/film', values);
  }

  deleteFilm(id: number): Observable<any>{
    return this.http.delete(filmsApi + '/film/' + id);
  }

  rateFilm(filmId: number, rating: number): Observable<any> {
    return this.http.post(filmsApi + '/rate', {filmId, rating});
  }

  getRating(id: number): Observable<any> {
    return this.http.get<any>(filmsApi + '/rating/' + id);
  }

  getUserRating(id: number): Observable<any> {
    return this.http.get<any>(filmsApi + '/user-rating/' + id);
  }

  deleteRating(id: number): Observable<any> {
    return this.http.delete<any>(filmsApi + '/rating/' + id);
  }
}
