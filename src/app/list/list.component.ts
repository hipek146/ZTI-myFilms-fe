import {AfterViewInit, Component, ElementRef, ViewChild} from "@angular/core";
import {Film} from "../interfaces/Film";
import {FilmsService} from "../services/films-service";
import {Router} from "@angular/router";
import {Store} from "../core/store";
import {Modal} from 'bootstrap'
import {User} from "../interfaces/User";
import {NotificationsService} from "../services/notifications-service";

@Component({
  selector: 'add-film',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements AfterViewInit {
  films: Film[] = [];
  user!: User | null;

  searchValue: string = '';
  searchTimeout!: ReturnType<typeof setTimeout>;
  searchDelay: number = 500;

  toDeleteId!: number;

  @ViewChild('deleteDialogElement')
  deleteDialogElement!: ElementRef;

  deleteDialog!: Modal;

  constructor(private filmsService: FilmsService,
              private notificationsService: NotificationsService,
              private store: Store,
              private router: Router) {
    this.user = this.store.user;
    this.store.userChanged.subscribe(() => {
      this.user = this.store.user;
    });
  }

  ngAfterViewInit() {
    this.deleteDialog = new Modal(this.deleteDialogElement.nativeElement);
    this.store.filmsChanged.subscribe(() => {
      this.updateFilms();
    });
    this.updateFilms();
  }

  updateFilms(title?: string) {
    this.filmsService.getFilms(title).subscribe(films => this.films = films);
  }

  onDelete(id: number) {
    this.deleteDialog.toggle();
    this.toDeleteId = id;
  }

  onDeleteConfirm() {
    this.filmsService.deleteFilm(this.toDeleteId).subscribe(() => {
        this.updateFilms();
        this.deleteDialog.toggle();
        this.notificationsService.success("Pomyślnie usunięto film");
      }, () => {
      this.deleteDialog.toggle();
      this.notificationsService.danger("Wystąpił błąd");
    });
  }

  onEdit(id: number) {
    this.router.navigate(['edit-film', id]);
  }

  onDetails(id: number) {
    this.router.navigate(['details', id]);
  }

  search(title: string) {
    this.searchValue = title;
    if (!this.searchValue.length || this.searchValue.length >= 3) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        this.updateFilms(this.searchValue);
      }, this.searchDelay);
    }
  }
}
