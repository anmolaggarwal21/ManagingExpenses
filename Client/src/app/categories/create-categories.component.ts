import { Component, OnInit } from '@angular/core';
import { categoryService } from '../../app/categories/categoryService';
import * as uuid from 'uuid'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css']
 
})
export class CreateCategoriesComponent implements OnInit {
  categoryType: any;
  categoryName: any;
  Description: any;
  
  constructor(private _categoryService: categoryService, private route: Router) {
  
   }

  ngOnInit(): void {
  }

  saveCategory(categoryForm){

    this._categoryService.createCategory({
      
      categoryType: categoryForm.value.categoryType,
      categoryName: categoryForm.value.categoryName,
      categoryDescription: categoryForm.value.Description,
    }).subscribe(data => {
      this.route.navigate(['/category/list'])
      console.log(data)
    })
   
   
  }

}

//********************************************************************** */
// categoryform in the html is the reference to the ngform. this categoryform contains all the properties of the form