import { Component, OnInit } from '@angular/core';
import { GetGenreService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-genre-detail-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent implements OnInit {
  genre: any;

  constructor(
    private getGenreService: GetGenreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.getGenreService.getGenre(this.data.genre)
      .subscribe(genre => (console.log(genre), this.genre = genre))
  }
}
