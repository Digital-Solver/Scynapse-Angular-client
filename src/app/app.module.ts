// Angular Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { UserLoginService } from './fetch-api-data.service';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { HeaderComponent } from './header/header.component';
import { ProfileViewComponent } from './profile-view/profile-view.component'

// Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { GenreViewComponent } from './genre-view/genre-view.component';
import { DirectorViewComponent } from './director-view/director-view.component';
import { MovieCardFavoriteComponent } from './movie-card-favorite/movie-card-favorite.component';

/**
* Defines the routes for the app.

* @remarks
* The app routes define the paths that can be navigated to within the app. Each route consists of a path and a component.
* The path is the string that appears in the URL, and the component is the Angular component that is displayed when the
* path is navigated to.
*/
const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: ProfileViewComponent },
  { path: 'movies/:Title', component: MovieViewComponent},
  { path: 'directors/:Name', component: DirectorViewComponent},
  { path: 'genres/:Name', component: GenreViewComponent},
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' }
];

/**
 * The root module of the app.
 * Responsible for defining the application's components, services, and routes, as well as importing the necessary Angular modules and third-party libraries.
 *
 * @export
 * @class AppModule
 */
@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    HeaderComponent,
    ProfileViewComponent,
    MovieViewComponent,
    GenreViewComponent,
    DirectorViewComponent,
    MovieCardFavoriteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    MatToolbarModule,
  ],
  providers: [
    UserLoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
