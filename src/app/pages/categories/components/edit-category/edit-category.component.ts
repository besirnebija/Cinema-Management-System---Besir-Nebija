import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../categories-service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
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


