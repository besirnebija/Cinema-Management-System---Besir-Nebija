import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from '../../movies-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CategoriesService } from 'src/app/pages/categories/categories-service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {
  
  createMovieForm:any = UntypedFormGroup;
  categoriesList: any = [];
  constructor(
    private moviesService: MoviesService, 
    private categoriesService: CategoriesService,
    private router:Router, 
    private message:NzMessageService) { }

  ngOnInit() {
    this.categoriesList = this.categoriesService.getCategories()
    this.createMovieForm = new FormGroup({
      title: new FormControl('', Validators.required),
      director: new FormControl('', Validators.required),
      release_date: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category_name: new FormControl('', Validators.required),
    })
  }
  onSubmit() {
    if (this.createMovieForm.valid) {
      try {
        this.moviesService.addMovie(this.createMovieForm.value);
        this.createMovieForm.reset();
        this.message.success('Movies created successfully');
        this.router.navigateByUrl('/movies');
      } catch (error:any) {
        if (error.message === 'A movie with these details already exists.') {
          this.message.error('A movie with these details already exists. Please check your input.');
        } else {
          console.error('Error creating movie:', error);
          this.message.error('Failed to create movie. Please try again.');
        }
      }
    } else {
      this.message.error('Form is not valid. Please check your input.');
      
    }
  }
  onBack() {
    this.router.navigateByUrl('/movies');
  }

}
