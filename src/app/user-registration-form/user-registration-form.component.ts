import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The User Registration view of the app.
 * 
 * @remarks
 * Allows the uer to enter their registration details and submit them to the server.
 * If the registration is successful, the user is notified via the Snack Bar popup.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /**
   * The user's registration data, including:
   * username, password, email, and birthday.
   */
  @Input()
  userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  };

  /**
 * Constructs a new instance of the `UserRegistrationFormComponent`.
 * 
 * @param fetchApiData The API fetching service, calls the user registration API endpoint
 * @param dialogRef The reference to the dialog containing this component
 * @param snackBar The Snack Bar popup service provided by Angular Material
 */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  /**
  * Angular lifecycle hook that initializes the component.
  * 
  * @remarks
  * This method is required by the OnInit interface and is called by Angular when the component is initialized.
  * It is currently empty. This follows best practice, but it can also be used to perform any necessary initialization logic for the component in future.
  */
  ngOnInit(): void { }
  
  /**
  * Registers the user by calling the user registration API endpoint with the user's data.
  * 
  * @throws If the server returns an error, a Snack Bar popup is displayed with the error message.
  */
  registerUser(): void {
    this.fetchApiData.registerUser(this.userData).subscribe({
      next: (result) => {
        this.dialogRef.close();
        console.log(result, this.userData);
        this.snackBar.open("Registration successful!", 'OK', {
          duration: 2000
        });
      },
      error: (result) => {
        console.log(this.userData);
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      }
    });
  }
}
