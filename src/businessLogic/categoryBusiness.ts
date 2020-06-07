import { categoryAccess } from "../dataLayer/categoryAccess";
import { createCategoryRequest, updateCategoryRequest } from "../request/createCategoryRequest";
import { Category } from "../models/Category";
import * as uuid from 'uuid'

const CategoryAccess  = new categoryAccess()

export async function getCategoryByCategoryId(categoryId: string) {
return await CategoryAccess.getCategoryAccessByCategoryId(categoryId)
}

export async function createCategoryService(createCategory: createCategoryRequest ){

    const category: Category = {
        categoryId : uuid.v4(),
        categoryDescription :createCategory.categoryDescription,
        categoryName : createCategory.categoryName,
        categoryType : createCategory.categoryType
    }
   return  await CategoryAccess.createCategoryAccess(category)
}

export async function getCategoryByCategoryType(categoryType: string){

    return await CategoryAccess.getCategoryAccessByCategoryType(categoryType) 
}

export async function deleteCategoryByCategoryId(categoryId: string){
    return await CategoryAccess.deleteCategoryByCategoryId(categoryId)
}

export async function updateCatgoryByCategoryId(categoryId: string, updateCategory : updateCategoryRequest){
    return await CategoryAccess.updateCategoryByCategoryId(categoryId, updateCategory)
}