import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GetUserDetailsService } from '../fetch-api-data.service';
import { EditUserDetailsService } from '../fetch-api-data.service';
import * as bcrypt from 'bcryptjs';

/**
 * The Profile View component of the app.
 * 
 * @remarks
 * Allows users to view and edit their personal profile details, such as username, email, birthday, and password.
 */
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  /**
   * Form group containing form controls for user details: `Username`, `Email`, `Birthday`, and `Password`.
   */
  form = new FormGroup({
    Username: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Birthday: new FormControl('', Validators.required),
    Password: new FormControl('')
  });

  /** Indicates whether editing mode is enabled. */
  editing = false;

  /** The encrypted password string from the database. */
  hashedPassword = "";

  /**
   * Constructs a new instance of the `ProfileViewComponent`.
   * 
   * @param getUserDetailsService The service that gets user details from the API.
   * @param editUserDetailsService The service that updates user details using the API.
   * @param formBuilder The Angular service for building reactive forms.
   */
  constructor(
    private getUserDetailsService: GetUserDetailsService,
    private editUserDetailsService: EditUserDetailsService,
    private formBuilder: FormBuilder,
  ) { }

  /**
   * Initializes the component by creating the form group and setting the form fields to the user's current profile information.
   */
  ngOnInit() {
    this.form = this.formBuilder.group({
      Username: '',
      Email: '',
      Birthday: '',
      Password: '',
    });
    this.getUserDetailsService.getUserDetails().subscribe((response: any) => {
      this.form.setValue({
        Username: response.Username,
        Email: response.Email,
        Birthday: this.formatShortDate(response.Birthday),
        Password: response.Password,
      });
      this.hashedPassword = response.Password;
    });
  }

  /**
   * Utility method that changes a long-format date to a short-format date.
   * 
   * @param dateString The long date as a string.
   * @returns The short date as a string.
   */
  formatShortDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  /**
  * Validates the given password by comparing it to the encrypted password from the server.
  * 
  * @param password The user-entered password to be validated.
  * @param hashedPassword The encrypted password from the server to be compared to.
  * @returns `true` if the passwords match, `false` otherwise.
  */
  validatePassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }

  /**
   * Enables editing if password is correct. Displays an alert if not.
   */
  allowEdits() {
    const currentPassword = prompt('Please enter your current password:');
    if (currentPassword && this.validatePassword(currentPassword, this.hashedPassword)) {
      this.editing = true;
      this.form.controls['Password'].setValue(currentPassword);
    } else {
      alert('Incorrect password');
    }
  }

  /** Submits the form to edit user details. */
  submitForm() {
    const newUserDetails = this.form.value;
    console.log(this.form.value)
    this.editUserDetailsService.editUserDetails(newUserDetails).subscribe(() => {
      this.form.reset();
      this.editing = false;
      localStorage.setItem('user', newUserDetails.Username!);
      window.location.reload();
    });
  }
}
