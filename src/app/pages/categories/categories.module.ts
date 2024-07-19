import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';






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
    CategoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzDescriptionsModule,
    NzTableModule,
    NzModalModule,
    NzMessageModule,
    NzIconModule,
    NzFormModule,
    NzSelectModule,
    NzDividerModule,
    NzDatePickerModule
  ]
})
export class CategoriesModule { }
