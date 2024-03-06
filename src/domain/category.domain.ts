export interface CategoryDomain {
  id:string,
  name:string,
  users: string[],
  photoUrl: string,
}
export interface AllCategories {
  data: CategoryDomain[];
  endpage: number;
}
export interface CategoryRepository {
  createCategory(category: CategoryDomain): Promise<boolean>;
  deleteCategory(id: string): Promise<boolean>;
  getCategory(id: string): Promise<CategoryDomain>;
  getCategories(page: number): Promise<AllCategories>;
}

export interface CategoryUseCase {
  createCategory(category: CategoryDomain): Promise<boolean>;
  deleteCategory(id: string): Promise<boolean>;
  getCategory(id: string): Promise<CategoryDomain>;
  getCategories(page: number): Promise<AllCategories>;
}

export interface CategoryInterop {
  createCategory(category: CategoryDomain): any;
  deleteCategory(id: string): any;
  getCategory(id: string): Promise<CategoryDomain>;
  getCategories(page: number, token:string): Promise<AllCategories>;
}

export const ErrorCategoryNameRequired = 'Category name is required';
export const ErrorCategoryPhotoRequired = 'Category photo is required';
export const ErrorCategoryAlreadyExisted = 'Category already existed';
export const ErrorCategoryNotFound = 'Category not found';
export const ErrorCategoryDeleteFailed = 'Category not found to delete';