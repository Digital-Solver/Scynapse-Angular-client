import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GetUserDetailsService } from '../fetch-api-data.service';
import { EditUserDetailsService } from '../fetch-api-data.service';
import * as bcrypt from 'bcryptjs';

/**
 * The Profile View component of the app.
 */
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  /**
   * Creates the form group.
   */
  form = new FormGroup({
    Username: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Birthday: new FormControl('', Validators.required),
    Password: new FormControl('')
  });

  /**
   * Is editing mdoe enabled.
   */
  editing = false;

  /**
   * The encrypted password string from the database.
   */
  hashedPassword = "";

  /**
   * Constructs a new instance of the `ProfileViewComponent`.
   * 
   * @param getUserDetailsService The service that gets user details from the API.
   * @param editUserDetailsService The service that edits the user details form the API.
   * @param formBuilder The Angural import for reactive forms
   */
  constructor(
    private getUserDetailsService: GetUserDetailsService,
    private editUserDetailsService: EditUserDetailsService,
    private formBuilder: FormBuilder,
  ) { }

  /**
   * Initialises the component with form fields: Username, Email, Birthday, and Password.
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
   * Compares the user-entered password with the encyrpted password and returns whether it matches or not.
   * 
   * @param password Th user-entered password.
   * @param hashedPassword The encrypted password from the server.
   * @returns Boolean of whether passwords match or not.
   */
  validatePassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }

  /**
   * Enables editing if password is validated.
   * Does not enable editing if password is incorrect, then alerts the user.
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

  /**
   * Submits the form to edit user details.
   */
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
