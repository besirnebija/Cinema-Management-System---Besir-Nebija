import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';





@NgModule({
  declarations: [
    CategoriesComponent,
    AllCategoriesComponent,
    EditCategoryComponent,
    CategoryDetailsComponent,
    CreateCategoryComponent
  ],
  imports: [
    CommonModule,

    
  ]
})
export class CategoriesModule { }
