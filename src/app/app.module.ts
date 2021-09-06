import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {AddFilmComponent} from "./add-film/add-film.component";
import {ListComponent} from "./list/list.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {AddFilmDialogComponent} from "./add-film/add-film-dialog/add-film-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DetailsComponent} from "./details/details.component";
import {LoginDialogComponent} from "./login/login-dialog/login-dialog.component";
import {LoginComponent} from "./login/login.component";
import {TokenInterceptor} from "./core/token-interceptor";
import {SpinnerComponent} from "./spinner/spinser.component";
import {NotificationsComponent} from "./notifications/notifications.component";

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    children: [
      {
      path: 'add-film',
      component: AddFilmComponent
      },
      {
        path: 'edit-film/:id',
        component: AddFilmComponent
      }]
  },
  { path: 'login',   component: LoginComponent, outlet: 'modal'},
  { path: 'details/:id',   component: DetailsComponent },
  { path: '**',   redirectTo: '', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserAnimationsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddFilmComponent,
    AddFilmDialogComponent,
    DetailsComponent,
    LoginComponent,
    LoginDialogComponent,
    SpinnerComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
    ],
  bootstrap: [AppComponent],
  entryComponents: [SpinnerComponent, NotificationsComponent],
})
export class AppModule { }
