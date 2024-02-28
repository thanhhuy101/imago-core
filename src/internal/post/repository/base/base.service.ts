import { Injectable } from '@nestjs/common';
import { PostDomain, PostRepository } from '../../../../domain/post.domain';
import * as admin from 'firebase-admin';

@Injectable()
export class BaseRepositoryService  implements PostRepository {
  private db: admin.firestore.Firestore;
  constructor() {
    this.db = admin.firestore();
  }

  async getDetail(id: string): Promise<PostDomain> {
    const post = await this.db.collection('posts').doc(id).get();
    console.log(id);
    // console.log(post.data());
    return post.data() as PostDomain;
  }
  async getByMentionId(mention:string): Promise<PostDomain[]> {
    const postsRef = this.db.collection('posts');
    const query = postsRef.where('mention', 'array-contains', mention);
    const snapshot = await query.get();
    const posts = snapshot.docs.map((doc) => doc.data() as PostDomain);
    return posts;
  }
  async getAllByUid(creatorId: string): Promise<PostDomain[]> {
    const post = await this.db.collection('posts').doc(creatorId).get();
    return post.data() as PostDomain[];
  }
  async getShare(uid: string): Promise<PostDomain[]> {
    const postsRef = this.db.collection('posts');
    const query = postsRef.where('share', 'array-contains', uid);
    const snapshot = await query.get();
    const posts = snapshot.docs.map((doc) => doc.data() as PostDomain);
    return posts;
  }
  async getByCateId(uid: string): Promise<PostDomain[]> {
    const postsRef = this.db.collection('posts');
    const query = postsRef.where('cateId', 'array-contains', uid);
    const snapshot = await query.get();
    const posts = snapshot.docs.map((doc) => doc.data() as PostDomain);
    return posts;
  }
  async create(post: PostDomain): Promise<boolean> {
    try {
      await this.db.collection('posts').doc(post.id).set(post);
      return true;
    } catch (e) {
      throw e;
    }
  }
  async update(post: PostDomain): Promise<boolean> {
    try {
      await this.db.collection('posts').doc(post.id).set(post);
      return true;
    } catch (e) {
      throw e;
    }
  }
  async delete(id: string): Promise<boolean> {
    try {
      const category = await this.db.collection('posts').doc(id).delete();
      return true;
    } catch (e) {
      throw e;
    }
  }
}

