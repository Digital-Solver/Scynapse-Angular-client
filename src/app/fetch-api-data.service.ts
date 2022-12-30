import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, EMPTY } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpErrorHandler } from './http-error-handler';


const domainURL = "https://kds-movie-api.herokuapp.com"

/** Service for handling user registration. */
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  constructor(private http: HttpClient) {
  }

  /**
   * Registers a new user.
   *
   * @param userRegistrationDetails The details for the user being registered.
   * @returns An Observable that will resolve with the server's response.
   * @throws If the server returns an error, a console.log will be displayed with the error message.
   */
  public registerUser(userRegistrationDetails: any): Observable<any> {
    return this.http.post(
      `${domainURL}/users`,
      userRegistrationDetails
    ).pipe(catchError(HttpErrorHandler.logAndReturnError));
  }
}

/** Service for handling user login. */
@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  /** A BehaviorSubject to track the login status of the user. Initial value is based on the presence of a 'user' item in local storage. */
  isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('user'));

  constructor(private http: HttpClient) {
  }

  /**
   * Logs the user in.
   *
   * @param userLoginDetails The login details for the user.
   * @returns An Observable that will resolve with the server's response.
   * @throws If the server returns an error, a console.log will be displayed with the error message.
   */
  public logUserIn(userLoginDetails: any): Observable<any> {
    return this.http
      .post(`${domainURL}/login`, null, { params: userLoginDetails })
      .pipe(catchError(HttpErrorHandler.logAndReturnError), tap(() => this.isLoggedIn$.next(true)));
  }

  /**
   * Logs the user out.
   *
   * @returns An Observable that will complete once the user is logged out.
   */
  public logUserOut(): Observable<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn$.next(false);
    return EMPTY;
  }
}

/** Service for getting all movies from the API. */
@Injectable({
  providedIn: 'root'
})
export class GetAllMoviesService {
  constructor(private http: HttpClient) {
  }

  /** Token for authenticating requests to the API */
  token = localStorage.getItem("token");

  /**
   * Gets all movies from the API.
   *
   * @returns An Observable that will resolve with an array of movie objects.
   * @throws If the server returns an error, a console.log will be displayed with the error message.
   */
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

/** Service for getting one movie from the API. */
@Injectable({
  providedIn: 'root'
})
export class GetOneMovieService {
  constructor(private http: HttpClient) {
  }

  
  /** Token for authenticating requests to the API */
  token = localStorage.getItem("token");

  /**
   * Gets the data for one movie from the API
   * 
   * @param movieTitle The title of the movie to get from the API
   * @returns The movie data as an object
   * @throws 
   */
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

/** Service for getting director data from the API. */
@Injectable({
  providedIn: 'root'
})
export class GetDirectorService {
  constructor(private http: HttpClient) {
  }


  
  /** Token for authenticating requests to the API */
  token = localStorage.getItem("token");

  /**
   * Gets the data for a director from the API
   * 
   * @param directorName The name of the director
   * @returns The data of the director as an object
   * @throws 
   */
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

/** Service for getting genre data from the API. */
@Injectable({
  providedIn: 'root'
})
export class GetGenreService {
  constructor(private http: HttpClient) {
  }

  
  /** Token for authenticating requests to the API */
  token = localStorage.getItem("token");

  /**
   * Gets the data for a genre from the API
   * 
   * @param genreName The name of the genre
   * @returns The data for the genre as an object
   * @throws 
   */
  public getGenre(genreName: string): Observable<any> {
    return this.http.get(
      `${domainURL}/genres/${genreName.replace(/\s/g, '%20')}`, {
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

/** Service for getting user details from the API. */
@Injectable({
  providedIn: 'root'
})
export class GetUserDetailsService {
  constructor(private http: HttpClient) { }

  /** User's username for correct context */
  username = localStorage.getItem('user');

  /** Token for authenticating requests to the API */
  token = localStorage.getItem('token');

  /**
   * Gets the user details from the API
   * 
   * @returns An observable that will resolve to an object containing the user data when the request is successful.
   * @throws An error message in the console
   */
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

/** Service for getting a user's favorite movies from the API. */
@Injectable({
  providedIn: 'root'
})
export class GetUserFavoriteMoviesService {
  constructor(private http: HttpClient) {
  }

  /** User's username for correct context */
  username = localStorage.getItem("user");
  
  /** Token for authenticating requests to the API */
  token = localStorage.getItem("token");

  /**
   * Gets the user's favorite movies from the API
   * 
   * @returns An observable that will resolve to an object containing the data about a user's favorite movies.
   * @throws An error message in the console
   */
  public getUserFavoriteMovies(): Observable<any> {
    return this.http.get(
      `${domainURL}/users/${this.username}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.token,
      }),
    })
      .pipe(
        map((res: any) => res.FavoriteMovies || []),
        catchError(HttpErrorHandler.logAndReturnError)
      );
  }
}

/** Service for adding a user's favorite movie. */
@Injectable({
  providedIn: 'root'
})
export class AddUserFavoriteMovieService {
  constructor(private http: HttpClient) {
  }

  /** User's username for correct context */
  username = localStorage.getItem("user");
  
  /** Token for authenticating requests to the API */
  token = localStorage.getItem("token");

  /**
   * Adds a movie to a user's favorites
   * 
   * @param movieId The ID of the movie to add as a favorite
   * @returns An observable that resolves to the updated list of favorite movies when the request is fulfilled
   * @throws A console message with the error
   */
  public addUserFavoriteMovie(movieId: string): Observable<any> {
    return this.http.post(
      `${domainURL}/users/${this.username}/favorites/${movieId}`,
      null,
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

/** Service for removing a user's favorite movie. */
@Injectable({
  providedIn: 'root'
})
export class DeleteUserFavoriteMovieService {
  constructor(private http: HttpClient) {
  }

  /** User's username for correct context */
  username = localStorage.getItem("user");
  
  /** Token for authenticating requests to the API */
  token = localStorage.getItem("token");

  /**
   * Removes a movie from a user's favorites
   * 
   * @param movieId The ID of the movie to be removed from favorites
   * @returns An observable that resolves to an updated list of favorite movies when the request is fulfilled
   * @throws A console error with the message
   */
  public deleteUserFavoriteMovie(movieId: string): Observable<any> {
    return this.http.delete(
      `${domainURL}/users/${this.username}/favorites/${movieId}`, {
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

/** Service for updating a user's data. */
@Injectable({
  providedIn: 'root'
})
export class EditUserDetailsService {
  constructor(private http: HttpClient) {
  }

  /** User's username for correct context */
  username = localStorage.getItem("user");
  
  /** Token for authenticating requests to the API */
  token = localStorage.getItem("token");

  /**
   * Updates the user's details on the server
   * 
   * @param newUserDetails An object containing the updated details from the user
   * @returns An object contining the updated details from the server
   * @throws A console error containing the message
   */
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

/** Service for deleting a user. */
@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {
  constructor(private http: HttpClient) {
  }

  /** User's username for correct context */
  username = localStorage.getItem("user");
  
  /** Token for authenticating requests to the API */
  token = localStorage.getItem("token");

  /**
   * Deletes a user from the database
   * 
   * @param username The username of the user to be deleted
   * @returns An observable that resolves to an object with the API's response when the request is fulfilled.
   * @throws A console error containing the message
   */
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
