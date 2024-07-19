import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private localStorageKey = 'categories';

  constructor() {
    this.initCategories();
  }

  private initCategories() {
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  getCategories(): any[] {
    const tasks = localStorage.getItem(this.localStorageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  addCategory(category: any) {
    const categories = this.getCategories();
    console.log(categories)
    const isDuplicate = categories.some(existingCategory => 
      existingCategory.category_name === category.category_name &&
      existingCategory.category_id === category.category_id
    );
  
    if (isDuplicate) {
      throw new Error('A category with these details already exists.');
    }

    category.id = new Date().getTime();
    categories.push(category);
    localStorage.setItem(this.localStorageKey, JSON.stringify(categories));
  }

  deleteCategory(categoryId: number) {
    let categories = this.getCategories();
    categories = categories.filter(category => category.id !== categoryId);
    localStorage.setItem(this.localStorageKey, JSON.stringify(categories));
  }

  getCategoriesById(categoryId: number): any {
    const tasks = this.getCategories();
    return tasks.find(category => category.id == categoryId);
  }
  

  updateCategory(updatedCategory: any) {
    let categories = this.getCategories();
    const index = categories.findIndex(category => category.id === updatedCategory.id);
    if (index !== -1) {
      categories[index] = updatedCategory;
      localStorage.setItem(this.localStorageKey, JSON.stringify(categories));
    }
  }
}
