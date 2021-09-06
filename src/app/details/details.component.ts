import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {FilmsService} from "../services/films-service";
import {Film} from "../interfaces/Film";
import {concat} from "rxjs";
import {bufferCount} from "rxjs/operators";
import {Store} from "../core/store";
import {User} from "../interfaces/User";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'details-component',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  film!: Film;
  stars: number[] = Array(10);
  rating: number = 0;
  active: number = 0;
  fill: number = 0;
  half: boolean = false;
  count: number = 0;
  user!: User | null;
  myRating!: number | null;
  trailerUrl!: SafeResourceUrl;

  constructor(private filmsService: FilmsService, private store: Store, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.user = this.store.user;
    this.store.userChanged.subscribe(() => {
      this.user = this.store.user;
      if (this.user && this.film) {
        this.filmsService.getUserRating(this.film.id).subscribe(response => {
          this.myRating = response.rating;
        }, () => {});
      } else{
        this.myRating = null;
      }
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    concat(this.filmsService.getRating(id), this.filmsService.getFilm(id))
      .pipe(bufferCount(2)).subscribe(([rating, film]) => {
      this.film = film;
      if (this.film.trailer) {
        this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.film.trailer);
      }
      this.rating = rating.rating;
      this.count = rating.count;
      this.updateStars(0);
      if (this.user) {
        this.filmsService.getUserRating(film.id).subscribe(response => {
          this.myRating = response.rating;
        }, () => {});
      }
    })
  }

  updateStars(hover: number) {
    if (this.user) {
      this.active = hover;
    }
    this.fill = Math.floor(this.rating);
    this.half = false;
    if (this.rating - this.fill >= 0.75) {
      this.fill++;
    } else if (this.rating - this.fill >= 0.25) {
      this.half = true;
    }
  }

  rate(rating: number) {
    this.filmsService.rateFilm(this.film.id, rating).subscribe(response => {
      this.rating = response.rating;
      this.count = response.count;
      this.myRating = rating;
      this.updateStars(0);
    });
  }

  deleteRating() {
    this.filmsService.deleteRating(this.film.id).subscribe(() => {
      this.myRating = null;
      this.filmsService.getRating(this.film.id).subscribe(response => {
        this.rating = response.rating;
        this.count = response.count;
        this.updateStars(0);
      })
    });
  }

  round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
