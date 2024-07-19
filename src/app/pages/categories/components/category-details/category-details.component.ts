import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../categories-service';
import { Route } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  category: any;
  categoryId: any;

  constructor( private categoriesService: CategoriesService, private router: Router, private route: ActivatedRoute, private message: NzMessageService ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['categoryId']
    }); this.fetchCategoryDetails()
  }

  fetchCategoryDetails(){
    this.category = this.categoriesService.getCategoriesById(this.categoryId);
    if(!this.category){
      this.message.error('User not found');
      this.router.navigateByUrl('./categories')
    }
  }
  onBack(){
    this.router.navigateByUrl('/categories')
  }

}
