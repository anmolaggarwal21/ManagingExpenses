import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { localStorageValues } from '../util/LocalStorageValue';
import { urlForServer } from '../util/config';

@Injectable()
export class categoryService {
  wholeUrl = urlForServer.wholeUrl;
  constructor(private http: HttpClient) { }

  createCategory(createCategoryModel){
      return this.http.post(`${this.wholeUrl}/category`,createCategoryModel)
  }

  // getCategory(selectedCategoryType : string){
  //     return this.http.get(`https://slcwobihdb.execute-api.us-east-2.amazonaws.com/dev/categoryByType/${selectedCategoryType}`)
  // }

  getCategoryByUserIdAndCateoryType(selectedCategoryType? : string){
    var userId = localStorage.getItem(localStorageValues.userId)
    var data;
    if(selectedCategoryType && selectedCategoryType != ''){
      data = { categoryType: selectedCategoryType }
    return this.http.get(`${this.wholeUrl}/categoryByUserId`,{params: data})}
    else{
      return this.http.get(`${this.wholeUrl}/categoryByUserId`)
    }

   
}
  getCategoryByCategoryId(categoryId: string){
    return this.http.get(`${this.wholeUrl}/categoryById/${categoryId}`)
  }

  updateCategoryByCategoryId(categoryId: string, updateModel){
    return this.http.put(`${this.wholeUrl}/category/${categoryId}`, updateModel)
  }
  deleteCategoryByCategoryId(categoryId : string){
    return this.http.delete(`${this.wholeUrl}/category/${categoryId}`)
    }
  
}