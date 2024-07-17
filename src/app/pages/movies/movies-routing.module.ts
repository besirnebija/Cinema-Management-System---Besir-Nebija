import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies.component';
import { AllMoviesComponent } from './components/all-movies/all-movies.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { CreateMovieComponent } from './components/create-movie/create-movie.component';

const routes: Routes = [
  { path: '', component: AllMoviesComponent },
  { path: 'edit-movie/:id', component: EditMovieComponent},
  { path: 'create-movie', component: CreateMovieComponent},
  { path: 'movie-details/:id', component: MovieDetailsComponent}

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
