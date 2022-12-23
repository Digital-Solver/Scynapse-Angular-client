import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetOneMovieService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-detail-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss']
})
export class MovieViewComponent implements OnInit {
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private getMovieService: GetOneMovieService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const movieTitle= params.get('Title');
      this.getMovieService.getOneMovie(movieTitle!).subscribe(movie => {
        this.movie = movie;
      });
    });
  }
}
