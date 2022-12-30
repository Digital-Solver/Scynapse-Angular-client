import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserLoginService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
/**
 * The User Login component view of the app
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  
  @Input() userData = { Username: '', Password: '' };

  /**
   * Constructs a new instance of the `UserLoginFormComponent`.
   * 
   * @param fetchApiData The API data fetching service
   * @param dialogRef The reference to the dialog
   * @param snackBar The Angular Material Snack Bar import
   * @param router The Angular Router import
   */
  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router) { }

  /**
   * Initialises the component
   */
  ngOnInit(): void { }

  /**
   * Logs the user in and alerts the user of the success or failure.
   * If successful: Sets `user` and `token in `localStorage`.
   * If unsuccessful: Returns the error to the user.
   */
  logTheUserIn(): void {
    this.fetchApiData.logUserIn(this.userData).subscribe({
      next: (result) => {
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);
        this.dialogRef.close();
        this.router.navigate(['movies']);
        this.snackBar.open("Login successful!", 'OK', {
          duration: 2000
        });
      },
      error: (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      }
    });
  }
}
