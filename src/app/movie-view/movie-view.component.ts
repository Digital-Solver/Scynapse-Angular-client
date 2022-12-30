import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetOneMovieService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';

/**
 * The Movie View component of the app.
 * 
 * @remarks
 * This component is responsible for displaying details of a specific movie to the user. 
 * It retrieves the movie data from the API using the `GetOneMovieService`, and displays the data in the view. 
 * It also allows the user to view additional information about the movie's director and genre by opening dialogs containing that data.
 */
@Component({
  selector: 'app-movie-detail-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss']
})
export class MovieViewComponent implements OnInit {
  movie: any;

  /** 
   * Constructs a new instance of the MovieViewComponent.
   * 
   * @param route The active route in the Angular Router, used to get the movie title from the URL.
   * @param getMovieService The service that retrieves movie data from the API.
   * @param dialog The Angular Material dialog service, used to open the director and genre dialogs. 
   */
  constructor(
    private route: ActivatedRoute,
    private getMovieService: GetOneMovieService,
    private dialog: MatDialog,
  ) { }

  /**
   * Initializes the component and fetches the data for the movie specified in the route parameters.
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
   * Opens a dialog containing the specified director's data.
   * 
   * @param director The director's data, taken from the movie data.
   */
  openDirectorModal(director: string) {
    this.dialog.open(DirectorViewComponent, { data: { director } })
  }

  /**
   * Opens a dialog containing a specified genre's data.
   * 
   * @param genre The genre data, taken from the movie data.
   */
  openGenreModal(genre: string) {
    console.log(genre);
    this.dialog.open(GenreViewComponent, { data: { genre } })
  }
}
