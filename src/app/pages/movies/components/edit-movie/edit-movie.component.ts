import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../movies-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CategoriesService } from 'src/app/pages/categories/categories-service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  editMovieForm: any = FormGroup;
  movieId: any;
  movieDetails: any;
  categoriesList: any = [];
  constructor(
    private moviesService: MoviesService,
    private categoriesService: CategoriesService, 
    private router: Router, private route: ActivatedRoute, 
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.categoriesList = this.categoriesService.getCategories()
    this.route.queryParams.subscribe(params => {
      this.movieId = params['movieId']
    })
    this.movieDetails = this.moviesService.getMoviesById(this.movieId);
    
    this.editMovieForm = new FormGroup({
      id: new FormControl(this.movieId),
      title: new FormControl('', Validators.required),
      director: new FormControl('', Validators.required),
      release_date: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category_name: new FormControl('', Validators.required),
  })
  this.fillInput();

}
fillInput(){
  if(this.movieDetails){
    this.editMovieForm.patchValue(this.movieDetails);
  }else{
    this.message.error('movie not found')
    this.router.navigateByUrl('/movies')
  }
}

onSubmit(){
  if(this.editMovieForm.valid){
    try{
      this.moviesService.updateMovie(this.editMovieForm.value);
      this.message.success('Movie updated successfully');
      this.router.navigateByUrl('/movies')
    }catch(error:any){
      console.error('Error updating movie', error)
      this.message.error('Failed to update movie. Please try again')
    }
    }else{
      this.message.error('Form is not valid')
    }
  } 
  onBack() {
    this.router.navigateByUrl('/movies');
  }

}

/* 


export class EditCategoryComponent implements OnInit {
  editCategoryForm: any = FormGroup;
  categoryId: any;
  categoryDetails: any;

  constructor(private categoriesService: CategoriesService, private router: Router, private route: ActivatedRoute, private message: NzMessageService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => { 
      this.categoryId = params['categoryId']
    })
    this.categoryDetails = this.categoriesService.getCategoriesById(this.categoryId);
    this.editCategoryForm = new FormGroup({
      id: new FormControl(this.categoryId),
      category_name: new FormControl('', Validators.required)
    })
    this.fillInput();
  }
  fillInput(){
    if(this.categoryDetails){
      this.editCategoryForm.patchValue(this.categoryDetails);
    }else{
      this.message.error('category not found')
      this.router.navigateByUrl('/categories')
    }
  }

  onSubmit(){
    if(this.editCategoryForm.valid){
      try{
        this.categoriesService.updateCategory(this.editCategoryForm.value);
        this.message.success('Category updated successfully');
        this.router.navigateByUrl('/categories')
      }catch(error:any){
        console.error('Error updating category', error)
        this.message.error('Failed to update category. Please try again')
      }
      }else{
        this.message.error('Form is not valid')
      }
    } 
    onBack() {
      this.router.navigateByUrl('/categories');
    }

  }




*/ 