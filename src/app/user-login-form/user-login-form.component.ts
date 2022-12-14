import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserLoginService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  logUserIn(): void {
    this.fetchApiData.logUserIn(this.userData).subscribe({
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
