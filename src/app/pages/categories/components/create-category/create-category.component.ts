import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../categories-service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';



@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  
  createCategoriesForm:any = UntypedFormGroup;

  constructor(private categoriesService: CategoriesService, private router: Router, private message: NzMessageService) { }

  ngOnInit(): void {
    this.createCategoriesForm = new FormGroup({
      category_name: new FormControl('', Validators.required)
    });
    
  }
  onSubmit() {
    if (this.createCategoriesForm.valid) {
      try {
        this.categoriesService.addCategory(this.createCategoriesForm.value);
        this.createCategoriesForm.reset();
        this.message.success('Category created successfully');
        this.router.navigateByUrl('/categories');
      } catch (error:any) {
        if (error.message === 'A category with these details already exists.') {
          this.message.error('A category with these details already exists. Please check your input.');
        } else {
          console.error('Error creating category:', error);
          this.message.error('Failed to create category. Please try again.');
        }
      }
    } else {
      this.message.error('Form is not valid. Please check your input.');
      
    }
  }

  onBack() {
    this.router.navigateByUrl('/categories');
  }

}
