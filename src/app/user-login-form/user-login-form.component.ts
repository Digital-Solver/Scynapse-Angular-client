import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserLoginService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
/**
 * The User Login component view of the app
 * 
 * @remarks
 * Allows the user to enter their login credentials and submit them to the server.
 * If the login is successful, the user is redirected to the Movies page and notified via a Snack Bar popup.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  
  /** The user's login data, including Username and Password */
  @Input() userData = { Username: '', Password: '' };

  /**
  * Constructs a new instance of the UserLoginFormComponent.
  * 
  * @param fetchApiData {UserLoginService} The API data fetching service that calls the user login API endpoint.
  * @param dialogRef {MatDialogRef} The reference to the dialog containing this component.
  * @param snackBar {MatSnackBar} The Snack Bar service provided by Angular Material.
  * @param router {Router} The router service provided by Angular.
  */
  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router) { }

  /**
  * Angular lifecycle hook that initializes the component.
  * 
  * @remarks
  * This method is required by the OnInit interface and is called by Angular when the component is initialized.
  * It is currently empty. This follows best practice, but it can also be used to perform any necessary initialization logic for the component in future.
  */
  ngOnInit(): void { }

  /**
   * Logs the user in and alerts the user of the result.
   * 
   * @throws If the server returns an error, a Snack Bar popup is displayed with the error message.
   * 
   * @remarks
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
