import { HttpException, Inject, Injectable } from '@nestjs/common';
import {
  CategoryDomain,
  CategoryRepository,
  CategoryUseCase,
  ErrorCategoryAlreadyExisted,
  ErrorCategoryDeleteFailed,
  ErrorCategoryNameRequired,
  ErrorCategoryNotCreated,
  ErrorCategoryNotFound,
  ErrorCategoryNotString,
  ErrorCategoryPhotoRequired,
} from '../../../../domain/category.domain';
@Injectable()
export class CategoryUseCaseBaseService implements CategoryUseCase {

  constructor(@Inject('CategoryRepository') private repository: CategoryRepository) {}

   async createCategory(category: CategoryDomain): Promise<boolean> {

     if (typeof (category.id) !== 'string') {
       throw ErrorCategoryNotString;
     }
    if (category.name === '' || category.name === undefined || category.name === null) {
      throw ErrorCategoryNameRequired;
    }
    if (category.photoUrl === '' || category.photoUrl === undefined || category.photoUrl === null) {
      throw ErrorCategoryPhotoRequired;
    }
     let existed = await this.repository.getCategory(category.id);
     if (existed) {
        throw ErrorCategoryAlreadyExisted;  }
     if (!category.name || !category.photoUrl || !category.users || !category.id) {
       throw ErrorCategoryNotCreated;    }
    return this.repository.createCategory(category);
  }

    async deleteCategory(id: string): Promise<boolean> {
      let existed = await this.repository.getCategory(id);
      if (!existed) {
        console.error(ErrorCategoryDeleteFailed);
      }
       return this.repository.deleteCategory(id);
    }
    async getCategory(id: string): Promise<CategoryDomain> {
        // return await this.repository.getCategory(id);
      let existed = await this.repository.getCategory(id);
      if (!existed) {
        throw ErrorCategoryNotFound;
      }
      return this.repository.getCategory(id);
    }
    getCategories(): Promise<CategoryDomain[]> {
        return this.repository.getCategories();
    }
}
