import { Component, OnInit } from '@angular/core';
import { GetDirectorService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

/**
 * The Director View component of the app displays detailed information about a particular director.
 * 
 * @remarks
 * This component is displayed in a dialog window and is initialized with the Director data passed through the dialog's data object.
 * The Director data is fetched from the API using the `GetDirectorService`.
 */
@Component({
  selector: 'app-director-detail-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {
  /** The data about the director */
  director: any;

  /**
   * Constructs a new instance of the `DirectorViewComponent`.
   * 
   * @param getDirectorService The service that gets the director data form the API
   * @param data The data for the Angular Dialog
   */
  constructor(
    private getDirectorService: GetDirectorService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  /** Initialises the component with the director data */
  ngOnInit(): void {
    console.log(this.data, this.data.director)
    this.getDirectorService.getDirector(this.data.director)
      .subscribe(director => this.director = director)
  }
}
