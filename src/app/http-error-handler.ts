import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

/**
 * Provides a method for handling HTTP errors.
 */
export class HttpErrorHandler {
  /**
   * Logs and returns an observable HTTP error.
   *
   * @param httpError The HTTP error to be logged and returned.
   * @returns An observable of the error with a default error message.
   * @throws If the server returns an error, an error is displayed in the console with the error message.
   */
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
