// src/app/app.component.ts
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

/**
 * The root component of the app.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
 * The title of the app.
 */
  title = 'myFlix-Angular-client';

  /**
 * Constructs a new instance of the `AppComponent`.
 *
 * @param dialog The dialog service.
 */
  constructor(public dialog: MatDialog) { }
}
