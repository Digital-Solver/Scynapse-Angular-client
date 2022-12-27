import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService } from '../fetch-api-data.service';
import { GetUserFavoriteMoviesService } from '../fetch-api-data.service';
import { AddUserFavoriteMovieService } from '../fetch-api-data.service';
import { DeleteUserFavoriteMovieService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card-favorite',
  templateUrl: './movie-card-favorite.component.html',
  styleUrls: ['./movie-card-favorite.component.scss']
})
export class MovieCardFavoriteComponent implements OnInit {
  movies: any;
  favoriteMovies: any;
  processing: boolean = false;

  constructor(
    private router: Router,
    private getMoviesService: GetAllMoviesService,
    private getUserFavoriteMoviesService: GetUserFavoriteMoviesService,
    private addUserFavoriteMovieService: AddUserFavoriteMovieService,
    private deleteUserFavoriteMovieService: DeleteUserFavoriteMovieService,
  ) { }

  ngOnInit(): void {
    this.getMoviesService.getAllMovies().subscribe(movies => {
      this.movies = movies;
      this.getUserFavoriteMoviesService.getUserFavoriteMovies().subscribe(favoriteMovies => {
        this.favoriteMovies = favoriteMovies;
        this.setFavoriteProperties();
      });
    });
  }

  setFavoriteProperties() {
    this.movies.forEach((movie: any) => {
      movie.favorite = this.favoriteMovies.includes(movie._id);
    });
  }

  goToMovie(movieTitle: any): void {
    this.router.navigate(['movies', movieTitle])
  }

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
