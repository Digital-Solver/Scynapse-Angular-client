// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService } from '../fetch-api-data.service'

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(public getAllMoviesService: GetAllMoviesService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.getAllMoviesService.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }
}
