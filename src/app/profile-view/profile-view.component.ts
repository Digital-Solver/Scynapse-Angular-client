import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GetUserDetailsService } from '../fetch-api-data.service';
import { EditUserDetailsService } from '../fetch-api-data.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  form = new FormGroup({
    Username: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Birthday: new FormControl('', Validators.required),
    Password: new FormControl('')
  });

  editing = false;
  hashedPassword = "";

  constructor(
    private getUserDetailsService: GetUserDetailsService,
    private editUserDetailsService: EditUserDetailsService,
    private formBuilder: FormBuilder,
  ) { }

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

  formatShortDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  validatePassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }

  allowEdits() {
    const currentPassword = prompt('Please enter your current password:');
    if (currentPassword && this.validatePassword(currentPassword, this.hashedPassword)) {
      this.editing = true;
      this.form.controls['Password'].setValue(currentPassword);
    } else {
      alert('Incorrect password');
    }
  }

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
