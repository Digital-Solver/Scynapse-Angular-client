import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetOneMovieService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';

/**
 * The Movie View component of the app.
 */
@Component({
  selector: 'app-movie-detail-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss']
})
export class MovieViewComponent implements OnInit {
  movie: any;

  /**
   * Constructs a new instance of the `MovieViewComponent`.
   * 
   * @param route The active route in the Angular Router.
   * @param getMovieService The service that gets movie data from the API.
   * @param dialog The Angular Material dialog import.
   */
  constructor(
    private route: ActivatedRoute,
    private getMovieService: GetOneMovieService,
    private dialog: MatDialog,
  ) { }

  /**
   * Initialises the component with the Movie Title and gets that Movie's data.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const movieTitle = params.get('Title');
      this.getMovieService.getOneMovie(movieTitle!).subscribe(movie => {
        this.movie = movie;
      });
    });
  }

  /**
   * Opens a dialog containing director data.
   * 
   * @param director The director data, taken from the movie data.
   */
  openDirectorModal(director: string) {
    this.dialog.open(DirectorViewComponent, { data: { director } })
  }

  /**
   * Opens a dialog containing genre data.
   * 
   * @param genre The genre data, taken from the movie data.
   */
  openGenreModal(genre: string) {
    console.log(genre);
    this.dialog.open(GenreViewComponent, { data: { genre } })
  }
}
