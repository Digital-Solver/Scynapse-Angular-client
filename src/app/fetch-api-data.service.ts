import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandler } from './http-error-handler';

const domainURL = "https://kds-movie-api.herokuapp.com"

@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
  constructor(private http: HttpClient) {
  }

  public registerUser(userRegistrationDetails: any): Observable<any> {
    return this.http.post(
      `${domainURL}/users`,
      userRegistrationDetails
    ).pipe(catchError(HttpErrorHandler.logAndReturnError));
  }
}

export class UserLoginService {
  constructor(private http: HttpClient) {
  }

  public logUserIn(userLoginDetails: any): Observable<any> {
    return this.http.post(
      `${domainURL}/users`,
      userLoginDetails
    ).pipe(catchError(HttpErrorHandler.logAndReturnError));
  }
}

export class GetAllMoviesService {
  constructor(private http: HttpClient) {
  }

  token = localStorage.getItem("token");

  public getAllMovies(): Observable<any> {
    return this.http.get(
      `${domainURL}/movies/`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.token,
      }),
    }
    )
      .pipe(
        map((res) => { res || {} }),
        catchError(HttpErrorHandler.logAndReturnError)
      )
  }
}

export class GetOneMovieService {
  constructor(private http: HttpClient) {
  }

  token = localStorage.getItem("token");

  public getOneMovie(movieDetails: any): Observable<any> {
    return this.http.get(
      `${domainURL}/movies/${movieDetails}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.token,
      }),
    })
      .pipe(
        map((res) => { res || {} }),
        catchError(HttpErrorHandler.logAndReturnError)
      );
  }
}

export class GetDirectorService {
  constructor(private http: HttpClient) {
  }

  token = localStorage.getItem("token");

  public getDirector(directorDetails: any): Observable<any> {
    return this.http.get(
      `${domainURL}/directors/${directorDetails}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.token,
      }),
    }
    )
      .pipe(
        map((res) => { res || {} }),
        catchError(HttpErrorHandler.logAndReturnError)
      );
  }
}

export class GetGenreService {
  constructor(private http: HttpClient) {
  }

  token = localStorage.getItem("token");

  public getGenre(genreDetails: any): Observable<any> {
    return this.http.get(
      `${domainURL}/genre/${genreDetails}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.token,
      }),
    })
      .pipe(
        map((res) => { res || {} }),
        catchError(HttpErrorHandler.logAndReturnError)
      );
  }
}

export class GetUserDetailsService {
  constructor(private http: HttpClient) {
  }

  username = localStorage.getItem("user");
  token = localStorage.getItem("token");

  public getUserDetails(username: string): Observable<any> {
    return this.http.get(
      `${domainURL}/users/${username}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.token,
      }),
    })
      .pipe(
        map((res) => { res || {} }),
        catchError(HttpErrorHandler.logAndReturnError)
      );
  }
}

export class GetUserFavoriteMoviesService {
  constructor(private http: HttpClient) {
  }

  username = localStorage.getItem("user");
  token = localStorage.getItem("token");

  public getUserFavoriteMovies(username: string): Observable<any> {
    return this.http.get(
      `${domainURL}/users/${username}/favorites`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.token,
      }),
    })
      .pipe(
        map((res) => { res || {} }),
        catchError(HttpErrorHandler.logAndReturnError)
      );
  }
}

export class AddUserFavoriteMovieService {
  constructor(private http: HttpClient) {
  }

  username = localStorage.getItem("user");
  token = localStorage.getItem("token");

  public addUserFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.post(
      `${domainURL}/users/${username}/favorites/${movieId}`,
      { FavoriteMovie: movieId },
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + this.token,
        }),
      })
      .pipe(
        map((res) => { res || {} }),
        catchError(HttpErrorHandler.logAndReturnError)
      );
  }
}

export class DeleteUserFavoriteMovieService {
  constructor(private http: HttpClient) {
  }

  username = localStorage.getItem("user");
  token = localStorage.getItem("token");

  public deleteUserFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.delete(
      `${domainURL}/users/${username}/favorites/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.token,
      }),
    })
      .pipe(
        map((res) => { res || {} }),
        catchError(HttpErrorHandler.logAndReturnError)
      );
  }
}

export class EditUserDetailsService {
  constructor(private http: HttpClient) {
  }

  username = localStorage.getItem("user");
  token = localStorage.getItem("token");

  public editUserDetails(username: string, userNewDetails: any): Observable<any> {
    return this.http.post(
      `${domainURL}/users/${username}`,
      userNewDetails,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + this.token,
        }),
      })
      .pipe(
        map((res) => { res || {} }),
        catchError(HttpErrorHandler.logAndReturnError)
      );
  }
}

export class DeleteUserService {
  constructor(private http: HttpClient) {
  }

  username = localStorage.getItem("user");
  token = localStorage.getItem("token");

  public deleteUser(username: string): Observable<any> {
    return this.http.delete(
      `${domainURL}/users/${username}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.token,
      }),
    })
      .pipe(
        map((res) => { res || {} }),
        catchError(HttpErrorHandler.logAndReturnError)
      );
  }
}
