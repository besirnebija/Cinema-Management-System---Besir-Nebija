import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../categories-service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {

  categoryList: any[] = [];
  filteredCategoriesList: any[] = [];
  deleteCategoryModal: boolean = false;
  clickedCategoryData: any;
  searchTerm: FormControl = new FormControl();

  constructor(
    private categoriesService:CategoriesService, 
    private router: Router, 
    private message: NzMessageService ) { }

  ngOnInit(): void {
    this.fetchCategories();
    this.filteredCategoriesList = this.categoryList;

    this.searchTerm.valueChanges.pipe(
      debounceTime(300), 
      distinctUntilChanged(),
      switchMap(term => this.searchTasks(term)) 
    ).subscribe(filteredCategories => {
      this.filteredCategoriesList = filteredCategories;
    });
  }
  fetchCategories() {
    this.categoryList = this.categoriesService.getCategories();
    this.filteredCategoriesList = this.categoryList;
  }

  deleteCategory(item: any) {
    this.clickedCategoryData = item;
    this.deleteCategoryModal = true;
    
  }

  deleteCategoryFromTable(categoryId: number) {
    this.categoriesService.deleteCategory(categoryId);
    this.fetchCategories();
    this.deleteCategoryModal = false;
    this.message.success('Category deleted successfully');

  }

  closeDeleteTaskModal() {
    this.deleteCategoryModal = false;
  }

  navigateToCreateCategory() {
    this.router.navigate(['/categories/create-category']);
  }
  searchTasks(term: string) {
    if (!term.trim()) {
      return [this.categoryList];
    }
    return [this.categoryList.filter(category =>
      (category.title && category.title.toLowerCase().includes(term.toLowerCase()))
    )];
  }
  
}
