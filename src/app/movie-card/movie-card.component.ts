import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService } from '../fetch-api-data.service';
import { GetUserFavoriteMoviesService } from '../fetch-api-data.service';
import { AddUserFavoriteMovieService } from '../fetch-api-data.service';
import { DeleteUserFavoriteMovieService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

/**
 * Component for displaying movies in a card format
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  /** An array of movie objects to be displayed in the card format */
  movies: any;

  /** An array of favorite movie objects for the current user */
  favoriteMovies: any;

  /** A boolean value indicating whether a favorite movie action is being processed */
  processing: boolean = false;

  /**
   * Constructs a new instance of the `MovieCardComponent`.
   * 
   * @param router The Angular service for navigating routes
   * @param getMoviesService The service for getching all movies from the API
   * @param getUserFavoriteMoviesService The service for fetching the current user's favorite movies from the API
   * @param addUserFavoriteMovieService The service for adding a movie to the current user's favorite movies
   * @param deleteUserFavoriteMovieService The service for deleting a movie from the current user's favorite movies
   */
  constructor(
    private router: Router,
    private getMoviesService: GetAllMoviesService,
    private getUserFavoriteMoviesService: GetUserFavoriteMoviesService,
    private addUserFavoriteMovieService: AddUserFavoriteMovieService,
    private deleteUserFavoriteMovieService: DeleteUserFavoriteMovieService,
  ) { }

  /**
  * Initialization method that gets all movies and the current user's favorite movies, and sets the `favorite` property for each movie
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

  /**
   * Sets the 'favorite' property on each movie object in the movies array. 
   * 'favorite' is set to true if the movie's id is included in the favoriteMovies array.
   */
  setFavoriteProperties() {
    this.movies.forEach((movie: any) => {
      movie.favorite = this.favoriteMovies.includes(movie._id);
    });
  }

  /**
 *  Navigates to the movie view page for the specified movie
 *
 *  @param movieTitle The title of the movie to view
 */
  goToMovie(movieTitle: any): void {
    this.router.navigate(['movies', movieTitle])
  }

  /**
  *  Adds a movie to the current user's favorite movies
  *
  *  @param movieId The ID of the movie to add as a favorite
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
  *  Removes a movie from the current user's favorite movies.
  *
  *  @param movieId The ID of the movie to remove from favorites
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
