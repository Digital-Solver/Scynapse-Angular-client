import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class HttpErrorHandler {
  public static logAndReturnError(httpError: HttpErrorResponse): any {
    if (httpError.error instanceof ErrorEvent) {
      console.error('An error occurred:', httpError.error.message);
    } else {
      console.error(
        `Error code: ${httpError.status}, ` +
        `Error body: ${httpError.error}`);
    }
    return throwError(
      () => new Error('Something happened. Try again later.')
    );
  }
}
