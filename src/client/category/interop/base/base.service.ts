import { Inject, Injectable } from '@nestjs/common';
import { CategoryDomain, CategoryInterop, CategoryUseCase } from '../../../../domain/category.domain';

@Injectable()
export class CategoryInteropBaseService implements CategoryInterop {
  constructor(@Inject('CategoryUseCase') private useCase: CategoryUseCase) {
  }
    async createCategory(category: CategoryDomain) {
      try {
        return await this.useCase.createCategory(category);
      }
      catch (e) {
        throw e;
      }
    }
    async deleteCategory(id: string){
        try {
          return this.useCase.deleteCategory(id);
        }catch (e) {
            throw e;
        }
    }
    async getCategory(id: string): Promise<CategoryDomain> {
    try {
      return this.useCase.getCategory(id);
    } catch (e) {
      throw e;
    }
    }
    getCategories(): Promise<CategoryDomain[]> {
      try {
        return this.useCase.getCategories();
      } catch (e) {
        throw e;
      }
    }
}
