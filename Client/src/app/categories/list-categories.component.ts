import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import {MatTableModule} from '@angular/material/table';
import {Router} from '@angular/router'

import { categoryService } from '../../app/categories/categoryService';


@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

 categories: Category[]
 selectedCategoryType: string ='Income'
 

displayedColumns: string[] = ['type', 'name', 'description','update','delete'];
  constructor(private _categoryServie : categoryService, private route: Router) { }

  ngOnInit(): void {
    this.getCategoryInComponent()
  }

  getCategoryInComponent(){
    const container = this
    container._categoryServie.getCategoryByUserIdAndCateoryType(this.selectedCategoryType).subscribe(data => {
      console.log(data )
      this.categories = (data as any).items 
    } )
  }

  selectvalueChange(value){
    this.selectedCategoryType = value;
    console.log(value)
    this.getCategoryInComponent()
  }

  updateCategory(categoryId){
    this.route.navigate([`category/update/${categoryId}`])
  }

  deleteCategory(categoryId){
    this._categoryServie.deleteCategoryByCategoryId(categoryId).subscribe(data => {
      this.getCategoryInComponent()
    })
  }

}
