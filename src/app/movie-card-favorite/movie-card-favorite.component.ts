import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService } from '../fetch-api-data.service';
import { GetUserFavoriteMoviesService } from '../fetch-api-data.service';
import { AddUserFavoriteMovieService } from '../fetch-api-data.service';
import { DeleteUserFavoriteMovieService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

/**
 * The Movie Card Favorite component displays a list of favorite movies.
 */
@Component({
  selector: 'app-movie-card-favorite',
  templateUrl: './movie-card-favorite.component.html',
  styleUrls: ['./movie-card-favorite.component.scss']
})
export class MovieCardFavoriteComponent implements OnInit {
  /** The list of movies. */
  movies: any;

  /** The list of favorite movies. */
  favoriteMovies: any;

  /** Whether a request is being processed. */
  processing: boolean = false;

  /**
   * Constructs a new instance of the `MovieCardFavoriteComponent`.
   *
   * @param router The router service.
   * @param getMoviesService The service for getting all movies.
   * @param getUserFavoriteMoviesService The service for getting the user's favorite movies.
   * @param addUserFavoriteMovieService The service for adding a favorite movie.
   * @param deleteUserFavoriteMovieService The service for deleting a favorite movie.
   */

  constructor(
    private router: Router,
    private getMoviesService: GetAllMoviesService,
    private getUserFavoriteMoviesService: GetUserFavoriteMoviesService,
    private addUserFavoriteMovieService: AddUserFavoriteMovieService,
    private deleteUserFavoriteMovieService: DeleteUserFavoriteMovieService,
  ) { }

/**
 * Initializes the component, getting and storing movie data and favorite status.
 */
  ngOnInit(): void {
    this.getMoviesService.getAllMovies().subscribe(movies => {
      this.movies = movies;
      this.getUserFavoriteMoviesService.getUserFavoriteMovies().subscribe(favoriteMovies => {
        this.favoriteMovies = favoriteMovies;
        this.setFavoriteProperties();
      });
    });
  }

  /** Sets the favorite property for each movie. */
  setFavoriteProperties() {
    this.movies.forEach((movie: any) => {
      movie.favorite = this.favoriteMovies.includes(movie._id);
    });
  }

  /**
 * Navigates to the movie view for a movie.
 *
 * @param movieTitle The title of the movie.
 */
  goToMovie(movieTitle: any): void {
    this.router.navigate(['movies', movieTitle])
  }

  /**
 * Adds a movie to the user's favorite movies.
 *
 * @param movieId The ID of the movie.
 * @returns An observable of the HTTP response.
 * @throws If the server returns an error, a console.log is displayed with the error message.
 */
  addFavoriteMovie(movieId: string) {
    this.processing = true;
    this.addUserFavoriteMovieService.addUserFavoriteMovie(movieId).subscribe({
      next: res => {
        console.log('Favorite movie added successfully: ', res);
        this.getUserFavoriteMoviesService.getUserFavoriteMovies().subscribe(favoriteMovies => {
          this.favoriteMovies = favoriteMovies;
          this.setFavoriteProperties();
          this.processing = false;
        });
      },
      error: err => {
        console.error('Error adding favorite movie: ', err);
        this.processing = false;
      }
    });
  }

  /**
 * Removes a movie from the user's favorite movies.
 *
 * @param movieId The ID of the movie.
 * @returns An observable of the HTTP response.
 * @throws If the server returns an error, a console.log is displayed with the error message.
 */
  removeFavoriteMovie(movieId: string) {
    this.processing = true;
    this.deleteUserFavoriteMovieService.deleteUserFavoriteMovie(movieId).subscribe({
      next: res => {
        console.log('Movie removed from favorites successfully: ', res);
        this.getUserFavoriteMoviesService.getUserFavoriteMovies().subscribe(favoriteMovies => {
          this.favoriteMovies = favoriteMovies;
          this.setFavoriteProperties();
          this.processing = false;
        });
      },
      error: err => {
        console.error('Error removing favorite movie: ', err);
        this.processing = false;
      }
    });
  }
}
