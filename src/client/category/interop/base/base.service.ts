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
    deleteCategory(id: string){
        return this.useCase.deleteCategory(id);
    }
    getCategory(id: string): Promise<CategoryDomain> {
        return this.useCase.getCategory(id);
    }
    getCategories(): Promise<CategoryDomain[]> {
        return this.useCase.getCategories();
    }
}
