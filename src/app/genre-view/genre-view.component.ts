import { Component, OnInit } from '@angular/core';
import { GetGenreService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

/**
 * The Genre View component of the app
 */
@Component({
  selector: 'app-genre-detail-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent implements OnInit {
  /** The data about the genre to be viewed */
  genre: any;

  /**
   * Constructs a new instance of the `GenreViewComponent`
   * 
   * @param getGenreService The service for getting genre data from the API
   * @param data The data for the Angular dialog
   */
  constructor(
    private getGenreService: GetGenreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  /**
   * Initialises the component with the genre data.
   */
  ngOnInit(): void {
    this.getGenreService.getGenre(this.data.genre)
      .subscribe(genre => (console.log(genre), this.genre = genre))
  }
}
