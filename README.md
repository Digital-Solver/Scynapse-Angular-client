# Scynapse - Angular Client

Live site: https://digital-solver.github.io/scynapse-angular/

A single-page, responsive movie app built with Angular, with routing and several interface views. The app allows users to access information about different movies, directors, and genres, as well as create and update their own profiles with their favorite movies. 

The client-side of the app supports the existing server-side from the movie-api repository by facilitating user requests and rendering the response from the server-side via a number of different interface views. The app is accompanied by relevant materials, including documentation, a kanban board containing user stories, and story points.

## Table of Contents

* [Features](https://github.com/Digital-Solver/scynapse-angular/edit/main/README.md#Features)
* [Technologies](https://github.com/Digital-Solver/scynapse-angular/edit/main/README.md#Technologies)
* [Installation](https://github.com/Digital-Solver/scynapse-angular/edit/main/README.md#Installation)
* [Materials](https://github.com/Digital-Solver/scynapse-angular/edit/main/README.md#Materials)
* [Contribution Guideilnes](https://github.com/Digital-Solver/scynapse-angular/edit/main/README.md#Contribution)
* [License](https://github.com/Digital-Solver/scynapse-angular/edit/main/README.md#License)
* [Contact](https://github.com/Digital-Solver/scynapse-angular/edit/main/README.md#Contact)
* [Resources](https://github.com/Digital-Solver/scynapse-angular/edit/main/README.md#Resources)

## Features

The Scynapse Angular client provides the following features:

* A welcome view where users can log in or register an account
* A view to display all movies
* A single movie view with additional movie details, including a button to view the director details and a button to view the genre details
* A director view with details about the director of a particular movie
* A genre view with details about a particular genre of a movie
* The ability for users to create a profile and save data about their favorite movies
* The ability for users to update their user information (username, password, email, date of birth)

### User Stories
Scynapse implements the following user stories:

1. As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.
2. As a user, I want to be able to create a profile so I can save data about my favorite movies.

## Technologies

Scynapse is built with the following technologies:

* Angular
* TypeScript
* HTML
* CSS
* Angular Material

## Installation 

1. Install the latest version of Node.js from the official website (https://nodejs.org/) by following the prompts to complete the installation process.
2. After installing Node.js, open your terminal and run the command `npm install -g @angular/cli` to install the Angular CLI globally. This will allow you to use the Angular CLI commands from any directory on your machine.
3. Clone the repository by running `git clone https://github.com/Digital-Solver/scynapse-angular.git` in your terminal.
4. Navigate to the root directory of the cloned repository by running `cd scynapse-angular`.
5. Run `npm install` to install all required dependencies listed in the package.json file.
6. Run `ng serve` to start the development server. The application will be available at http://localhost:4200/ and will automatically reload whenever you make changes to the source files.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.3.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Materials
The following materials were used in the development of Scynapse:

A kanban board for project management and task tracking
User flow diagrams to visualize the user experience
Wireframe diagrams to plan the layout and design of the interface

## Contribution Guidelines

If you would like to contribute to Scynapse, please follow these guidelines:

1. Fork this repository.
2. Create a new branch for your changes.
3. Make your changes and commit them to your branch.
4. Submit a pull request from your branch to this repository.

## License

Scynapse is released under the MIT License.

## Contact

If you have any questions or feedback about Scynapse, please contact me at kerr(dot)digitalsolver@gmail.com
