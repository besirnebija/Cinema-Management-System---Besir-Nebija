import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../../movies-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent implements OnInit {

  movieList: any[] = [];
  filteredMovieList: any[] = [];
  deleteMovieModal: boolean = false;
  clickedMovieData: any;
  searchTerm: FormControl = new FormControl();


  constructor( 
    private moviesService: MoviesService, 
    private router: Router, 
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.fetchMovies();
    this.filteredMovieList = this.movieList;

    this.searchTerm.valueChanges.pipe(
      debounceTime(300), 
      distinctUntilChanged(),
      switchMap(term => this.searchMovie(term)) 
    ).subscribe(filteredMovies => {
      this.filteredMovieList = filteredMovies;
    });
  }
  fetchMovies() {
    this.movieList = this.moviesService.getMovies();
    this.filteredMovieList = this.movieList;
  }

  deleteMovie(item: any) {
    this.clickedMovieData = item;
    this.deleteMovieModal = true;
  }

  deleteMovieFromTable(movieId: number) {
    this.moviesService.deleteMovie(movieId);
    this.fetchMovies();
    this.deleteMovieModal = false;
    this.message.success('Movie deleted successfully');

  }

  closeDeleteMovieModal() {
    this.deleteMovieModal = false;
  }

  navigateToCreateMovie() {
    this.router.navigate(['/movies/create-movie']);
  }

  searchMovie(term: string) {
    if (!term.trim()) {
      return [this.movieList];
    }
    return [this.movieList.filter(movie =>
      (movie.title && movie.title.toLowerCase().includes(term.toLowerCase())) 
    )];
  }
  
    
}


