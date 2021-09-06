import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {AuthService} from "../services/auth-service";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {SpinnerService} from "../services/spinner-serevice";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, private spinnerService: SpinnerService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.endsWith('films') && !request.params.keys().length) {
      this.spinnerService.show();
    }
    const token = this.auth.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request)
      .pipe(catchError((err) => {
        this.spinnerService.hide();
        return throwError(err);
      }))
      .pipe(map<unknown, any>((evt: any) => {
        if (evt instanceof HttpResponse) {
          this.spinnerService.hide();
        }
        return evt;
      }));
  }
}
