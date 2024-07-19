import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private localStorageKey = 'movies';

  constructor() {
    this.initMovies();
  }

  private initMovies() {
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  getMovies(): any[] {
    const movies = localStorage.getItem(this.localStorageKey);
    return movies ? JSON.parse(movies) : [];
  }

  addMovie(movie: any) {
    const movies = this.getMovies();
    console.log(movies)
    const isDuplicate = movies.some(existingMovie => 
      existingMovie.title === movie.title &&
      existingMovie.director === movie.director &&
      existingMovie.release_date === movie.release_date &&
      existingMovie.category_id === movie.category_id
    );
  
    if (isDuplicate) {
      throw new Error('A task with these details already exists.');
    }

    movie.id = new Date().getTime();
    movies.push(movie);
    localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
  }

  deleteMovie(movieId: number) {
    let movies = this.getMovies();
    movies = movies.filter(movie => movie.id !== movieId);
    localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
  }

  getMoviesById(movieId: number): any {
    const movies = this.getMovies();
    return movies.find(movie => movie.id == movieId);
  }
  

  updateMovie(updatedMovie: any) {
    let movies = this.getMovies();
    const index = movies.findIndex(movie => movie.id === updatedMovie.id);
    if (index !== -1) {
      movies[index] = updatedMovie;
      localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
    }
  }
}
