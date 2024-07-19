import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';

const routes: Routes = [
  { path: '', component: AllCategoriesComponent },
  { path: 'edit-category/:id', component: EditCategoryComponent},
  { path: 'create-category', component: CreateCategoryComponent},
  { path: 'category-details/:id', component: CategoryDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
