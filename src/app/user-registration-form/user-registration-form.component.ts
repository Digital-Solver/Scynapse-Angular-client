import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input()
  userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  registerUser(): void {
    this.fetchApiData.registerUser(this.userData).subscribe({
      next: (result) => {
        this.dialogRef.close();
        console.log(this.userData);
        this.snackBar.open(result, 'OK', {
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