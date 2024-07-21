import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../movies-service';
import { Route } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CategoriesService } from 'src/app/pages/categories/categories-service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieDetails: any;
  movieId: any;

  constructor(private moviesService: MoviesService, private router: Router, private route: ActivatedRoute, private message: NzMessageService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.movieId = params['movieId']
    }); this.fetchMovieDetails()
  }

  fetchMovieDetails(){
    this.movieDetails = this.moviesService.getMoviesById(this.movieId);
    if(!this.movieDetails){
      this.message.error('Movie not found');
      this.router.navigateByUrl('./movies')
    }
  }
  onBack(){
    this.router.navigateByUrl('/movies')
  }
}
