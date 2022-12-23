import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, EMPTY } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('user'));

  constructor(private http: HttpClient) {
  }

  public logUserIn(userLoginDetails: any): Observable<any> {
    return this.http
      .post(`${domainURL}/login`, null, { params: userLoginDetails })
      .pipe(catchError(HttpErrorHandler.logAndReturnError), tap(() => this.isLoggedIn$.next(true)));
  }

  public logUserOut(): Observable<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn$.next(false);
    return EMPTY;
  }
}

@Injectable({
  providedIn: 'root'
})
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
    }).pipe(
      map((res: any) => res || {}),
      catchError(HttpErrorHandler.logAndReturnError)
    )
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetOneMovieService {
  constructor(private http: HttpClient) {
  }

  token = localStorage.getItem("token");

  public getOneMovie(movieTitle: string): Observable<any> {
    return this.http.get(
      `${domainURL}/movies/${movieTitle.replace(/\s/g, '%20')}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.token,
      }),
    })
      .pipe(
        map((res: any) => res || {}),
        catchError(HttpErrorHandler.logAndReturnError)
      );
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetDirectorService {
  constructor(private http: HttpClient) {
  }

  token = localStorage.getItem("token");

  public getDirector(directorName: string): Observable<any> {
    return this.http.get(
      `${domainURL}/directors/${directorName.replace(/\s/g, '%20')}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.token,
      }),
    }
    )
      .pipe(
        map((res: any) => res || {}),
        catchError(HttpErrorHandler.logAndReturnError)
      );
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetGenreService {
  constructor(private http: HttpClient) {
  }

  token = localStorage.getItem("token");

  public getGenre(genreName: string): Observable<any> {
    return this.http.get(
      `${domainURL}/genre/${genreName.replace(/\s/g, '%20')}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.token,
      }),
    })
      .pipe(
        map((res: any) => res || {}),
        catchError(HttpErrorHandler.logAndReturnError)
      );
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetUserDetailsService {
  constructor(private http: HttpClient) { }

  username = localStorage.getItem('user');
  token = localStorage.getItem('token');

  public getUserDetails(): Observable<any> {
    return this.http.get(
      `${domainURL}/users/${this.username}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    ).pipe(
      map((res) => res || {}),
      catchError(HttpErrorHandler.logAndReturnError)
    );
  }
}

@Injectable({
  providedIn: 'root'
})
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
        map((res: any) => res || {}),
        catchError(HttpErrorHandler.logAndReturnError)
      );
  }
}

@Injectable({
  providedIn: 'root'
})
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
        map((res: any) => res || {}),
        catchError(HttpErrorHandler.logAndReturnError)
      );
  }
}

@Injectable({
  providedIn: 'root'
})
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
        map((res: any) => res || {}),
        catchError(HttpErrorHandler.logAndReturnError)
      );
  }
}

@Injectable({
  providedIn: 'root'
})
export class EditUserDetailsService {
  constructor(private http: HttpClient) {
  }

  username = localStorage.getItem("user");
  token = localStorage.getItem("token");

  public editUserDetails(newUserDetails: any): Observable<any> {
    console.log(`User updating to: ${newUserDetails}`);
    return this.http.put(
      `${domainURL}/users/${this.username}`,
      newUserDetails,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + this.token,
        }),
      })
      .pipe(
        map((res: any) => res || {}),
        catchError(HttpErrorHandler.logAndReturnError)
      );
  };
}

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {
  constructor(private http: HttpClient) {
  }

  username = localStorage.getItem("user");
  token = localStorage.getItem("token");

  public deleteUser(username: string): Observable<any> {
    return this.http.delete(
      `${domainURL} /users/${username} `, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.token,
      }),
    })
      .pipe(
        map((res: any) => res || {}),
        catchError(HttpErrorHandler.logAndReturnError)
      );
  }
}
