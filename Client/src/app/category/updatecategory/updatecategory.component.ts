import { Component, OnInit } from '@angular/core';
import { categoryService } from 'src/app/categories/categoryService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.component.html',
  styleUrls: ['./updatecategory.component.css']
})
export class UpdatecategoryComponent implements OnInit {
  categoryType : any
  categoryName: any
  Description: any
  categoryIdFromRoute: string
  constructor(private _categoryService: categoryService , private activateroute: ActivatedRoute, private Route: Router) { }

  ngOnInit(): void {
    this.categoryIdFromRoute = this.activateroute.snapshot.paramMap.get('categoryId')
    this._categoryService.getCategoryByCategoryId(this.categoryIdFromRoute).subscribe(data => {
      var categoryDetails = (data as any).items
      this.categoryType = categoryDetails[0].categoryType
      this.categoryName=categoryDetails[0].categoryName
      this.Description = categoryDetails[0].categoryDescription
    })
  }

  updateCategory(categoryForm){

    this._categoryService.updateCategoryByCategoryId(this.categoryIdFromRoute,{
      
      categoryType: categoryForm.value.categoryType,
      categoryName: categoryForm.value.categoryName,
      categoryDescription: categoryForm.value.Description,
    }).subscribe(data => {
      this.Route.navigate(['/category/list'])
      
    })

  }

}
