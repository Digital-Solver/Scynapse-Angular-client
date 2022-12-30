// src/app/app.component.ts
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

/** 
 * The root component of the app.
 * 
 * @remarks
 * This component is responsible for managing the main app template and functionality.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
/** The title of the app. */
  title: string = 'myFlix-Angular-client';

/** 
 * Constructs a new instance of the `AppComponent`.
 * 
 * @param dialog Material Dialog - The dialog service provided by Angular Material.
*/
  constructor(public dialog: MatDialog) { }
}
