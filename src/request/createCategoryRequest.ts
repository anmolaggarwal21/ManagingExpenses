export interface createCategoryRequest{
   categoryType: string,
   categoryName: string,
   categoryDescription: string
}

export interface updateCategoryRequest extends createCategoryRequest  {

}