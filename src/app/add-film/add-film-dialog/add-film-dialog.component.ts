import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {FilmsService} from "../../services/films-service";
import {Store} from "../../core/store";
import {NotificationsService} from "../../services/notifications-service";

@Component({
  selector: 'add-film-dialog',
  templateUrl: 'add-film-dialog.component.html',
  styleUrls: ['./add-film-dialog.component.css']
})
export class AddFilmDialogComponent implements OnInit {

  filmForm = new FormGroup({
    title: new FormControl(''),
    year: new FormControl(''),
    director: new FormControl(''),
    description: new FormControl(''),
    poster: new FormControl(''),
    trailer: new  FormControl(''),
  });

  constructor(public dialogRef: MatDialogRef<AddFilmDialogComponent>,
              private filmsService: FilmsService,
              private notificationsService: NotificationsService,
              private store: Store,
              @Inject(MAT_DIALOG_DATA) public data: {id: number}) {

  }

  ngOnInit() {
    if (this.data.id) {
      this.filmsService.getFilm(this.data.id).subscribe(film => {
        const {id, ...filmControl} = film;
        this.filmForm.setValue(filmControl);
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.data.id) {
      this.filmsService.updateFilm({...this.filmForm.value, id: this.data.id}).subscribe(() => {
        this.store.filmsChanged.emit();
        this.notificationsService.success("Pomyślnie zaktualizowano film");
      }, (() => {
        this.notificationsService.danger("Wystąpił błąd");
      }));
    } else {
      this.filmsService.addFilm(this.filmForm.value).subscribe(() => {
        this.store.filmsChanged.emit();
        this.notificationsService.success("Pomyślnie dodano film");
      }, (() => {
        this.notificationsService.danger("Wystąpił błąd");
      }));
    }
    this.dialogRef.close();
  }
}
