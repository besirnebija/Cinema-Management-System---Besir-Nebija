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
    const users = localStorage.getItem(this.localStorageKey);
    return users ? JSON.parse(users) : [];
  }

  addMovie(movie: any) {
    const movies = this.getMovies();
    const isDuplicate = movies.some(existingMovie => 
      existingMovie.title === movie.title &&
      existingMovie.category === movie.category &&
      existingMovie.director === movie.director &&
      existingMovie.category_id === movie.category_id &&
      existingMovie.release_date === movie.release_date
    );
  
    if (isDuplicate) {
      throw new Error('A movie with these details already exists.');
    }

    movie.id = new Date().getTime();
    movies.push(movie);
    localStorage.setItem(this.localStorageKey, JSON.stringify(movie));
  }

  deleteMovie(movieId: number) {
    let movies = this.getMovies();
    movies = movies.filter(movie => movie.id !== movieId);
    localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
  }

  getUserById(movieId: number): any {
    const users = this.getMovies();
    return users.find(movie => movie.id == movieId);
  }
  

  updateUser(updateMovie: any) {
    let movies = this.getMovies();
    const index = movies.findIndex(movie => movie.id === updateMovie.id);
    if (index !== -1) {
      movies[index] = updateMovie;
      localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
    }
  }
}
