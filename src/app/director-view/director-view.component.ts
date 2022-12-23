import { Component, OnInit } from '@angular/core';
import { GetDirectorService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-director-detail-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {
  director: any;

  constructor(
    private getDirectorService: GetDirectorService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log(this.data, this.data.director)
    this.getDirectorService.getDirector(this.data.director)
      .subscribe(director => this.director = director)
  }
}
