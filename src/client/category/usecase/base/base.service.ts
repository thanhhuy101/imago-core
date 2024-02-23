import { Inject, Injectable } from '@nestjs/common';
import {
  CategoryDomain,
  CategoryRepository,
  CategoryUseCase, ErrorCategoryAlreadyExisted,
  ErrorCategoryNameRequired, ErrorCategoryNotFound, ErrorCategoryPhotoRequired,
} from '../../../../domain/category.domain';
import * as admin from 'firebase-admin';
import e from 'express';
@Injectable()
export class CategoryUseCaseBaseService implements CategoryUseCase {

  constructor(@Inject('CategoryRepository') private repository: CategoryRepository) {}

   async createCategory(category: CategoryDomain): Promise<boolean> {
    if (category.name === '' || category.name === undefined || category.name === null) {
      console.error(ErrorCategoryNameRequired)
    }
    if (category.photoUrl === '' || category.photoUrl === undefined || category.photoUrl === null) {
      console.error(ErrorCategoryPhotoRequired)
    }
     let existed = await this.repository.getCategory(category.id);
     if (existed) {
       console.error(ErrorCategoryAlreadyExisted);
     }
    return this.repository.createCategory(category);
  }

    deleteCategory(id: string): Promise<boolean> {
       return this.repository.deleteCategory(id);
    }
    async getCategory(id: string): Promise<CategoryDomain> {
      let existed = await this.repository.getCategory(id);
      if (!existed) {
        console.error(ErrorCategoryNotFound);
      }
      return this.repository.getCategory(id);
    }
    getCategories(): Promise<CategoryDomain[]> {
        return this.repository.getCategories();
    }
}
