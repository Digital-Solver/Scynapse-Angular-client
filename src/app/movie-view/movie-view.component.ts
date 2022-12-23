import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetOneMovieService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';

@Component({
  selector: 'app-movie-detail-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss']
})
export class MovieViewComponent implements OnInit {
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private getMovieService: GetOneMovieService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const movieTitle = params.get('Title');
      this.getMovieService.getOneMovie(movieTitle!).subscribe(movie => {
        this.movie = movie;
      });
    });
  }

  openDirectorModal(director: string) {
    this.dialog.open(DirectorViewComponent, { data: { director } })
  }

  openGenreModal(genre: string) {
    console.log(genre);
    this.dialog.open(GenreViewComponent, { data: { genre } })
  }
}
