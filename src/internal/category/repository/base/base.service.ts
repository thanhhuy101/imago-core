import { Injectable } from '@nestjs/common';
import { CategoryDomain, CategoryRepository } from '../../../../domain/category.domain';
import * as admin from 'firebase-admin';
@Injectable()
export class CategoryRepositoryBaseService implements CategoryRepository {
    private db: admin.firestore.Firestore;
    constructor() {
        this.db = admin.firestore();
    }
    async createCategory(category: CategoryDomain): Promise<boolean> {
        try {
          await this.db.collection('categories').doc(category.id).set(category);
          return true;
        }
        catch (e) {
            throw e;
        }
    }

    async deleteCategory(id: string): Promise<boolean> {
        try{
            const category = await this.db.collection('categories').doc(id).delete();
            return true;
        }catch (e) {
            throw e;
        }
    }
    async getCategory(id: string): Promise<CategoryDomain> {
        try{
            const category = await this.db.collection('categories').doc(id).get();
            return category.data() as CategoryDomain;
        }catch (e) {
            throw e;
        }
    }
    async getCategories(): Promise<CategoryDomain[]> {
        try {
         const categories = await this.db.collection('categories').get();
         return categories.docs.map(doc => doc.data() as CategoryDomain);
        }
        catch (e) {
            throw e;
        }
    }
}
