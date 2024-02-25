export interface CategoryDomain {
  id:string,
  name:string,
  users: string[],
  photoUrl: string,
}

export interface CategoryRepository {
  createCategory(category: CategoryDomain): Promise<boolean>;
  deleteCategory(id: string): Promise<boolean>;
  getCategory(id: string): Promise<CategoryDomain>;
  getCategories(): Promise<CategoryDomain[]>;
}

export interface CategoryUseCase {
  createCategory(category: CategoryDomain): Promise<boolean>;
  deleteCategory(id: string): Promise<boolean>;
  getCategory(id: string): Promise<CategoryDomain>;
  getCategories(): Promise<CategoryDomain[]>;
}

export interface CategoryInterop {
  createCategory(category: CategoryDomain): any;
  deleteCategory(id: string): any;
  getCategory(id: string): Promise<CategoryDomain>;
  getCategories(): Promise<CategoryDomain[]>;
}

export const ErrorCategoryNameRequired = 'Category name is required';
export const ErrorCategoryPhotoRequired = 'Category photo is required';
export const ErrorCategoryAlreadyExisted = 'Category already existed';
export const ErrorCategoryNotFound = 'Category not found';
export const ErrorCategoryDeleteFailed = 'Category not found to delete';