import { Injectable } from '@nestjs/common';
import {
  AllPosts,
  PostDomain,
  PostRepository,
  PostRespone,
} from '../../../../domain/post.domain';
import * as admin from 'firebase-admin';

@Injectable()
export class BaseRepositoryService implements PostRepository {
  private db: admin.firestore.Firestore;
  constructor() {
    this.db = admin.firestore();
  }

  async getPostById(id: string): Promise<PostDomain> {
    try {
      const post = await this.db.collection('posts').doc(id).get();
      return post.data() as PostDomain;
    } catch (e) {
      throw e;
    }
  }

  async getDetail(id: string): Promise<PostDomain> {
    const post = await this.db.collection('posts').doc(id).get();
    console.log(id);

    return post.data() as PostDomain;
  }

  async getByMentionId(
    mention: string,
    page: number,
    size: number,
  ): Promise<AllPosts> {
    const postsRef = this.db.collection('posts');
    const query = postsRef.where('mention', 'array-contains', mention);
    const snapshot = await query.get();
    const posts = snapshot.docs.map((doc) => doc.data() as PostDomain);
    return {
      data: posts.slice((page - 1) * size, page * size),
      endpage: Math.ceil(posts.length / size),
    };
  }
  async getAllPost(
    page: number,
  ): Promise<AllPosts>{
    try {
      const postRef =  this.db.collection('posts');
      const snapshot = await postRef.get();
      const posts = snapshot.docs.map((doc) => doc.data() as PostDomain);
      const size = 10;
      return {
        data: posts.slice((page - 1) * size, page * size),
        endpage: Math.ceil(posts.length / size),
      };
    }
    catch (e) {
      throw e;
    }
  }

  async getAllByUid(
    creatorId: string,
    page: number,
    size: number,
  ): Promise<PostRespone> {
    const postRef = await this.db.collection('posts');
    const query = postRef.where('creatorId', '==', creatorId);
    const snapshot = await query.get();
    const posts = snapshot.docs.map((doc) => doc.data() as PostDomain);
    return {
      data: posts.slice((page - 1) * size, page * size),
      endpage: Math.ceil(posts.length / size),
    };
  }

  async getMine(id: string, page: number, size: number): Promise<PostRespone> {
    const postsRef = this.db.collection('posts');
    const query = postsRef.where('creatorId', '==', id);
    const snapshot = await query.get();
    const post = snapshot.docs.map((doc) => doc.data() as PostDomain);
    return {
      data: post.slice((page - 1) * size, page * size),
      endpage: Math.ceil(post.length / size),
    };
  }

  async getShare(
    uid: string,
    page: number,
    size: number,
  ): Promise<PostRespone> {
    const postsRef = this.db.collection('posts');
    const query = postsRef.where('share', 'array-contains', uid);
    const snapshot = await query.get();
    const posts = snapshot.docs.map((doc) => doc.data() as PostDomain);
    return {
      data: posts.slice((page - 1) * size, page * size),
      endpage: Math.ceil(posts.length / size),
    };
  }

  async getByCateId(
    id: string,
    page: number,
    size: number,
  ): Promise<PostRespone> {
    const postsRef = this.db.collection('posts');
    const query = postsRef.where('cateId', 'array-contains', id);
    const snapshot = await query.get();
    const posts = snapshot.docs.map((doc) => doc.data() as PostDomain);
    return {
      data: posts.slice((page - 1) * size, page * size),
      endpage: Math.ceil(posts.length / size),
    };
  }

  async create(post: PostDomain): Promise<any> {
    try {
      await this.db.collection('posts').doc(post.id).set(post);
      return 'Create success';
    } catch (e) {
      throw e;
    }
  }
  async update(post: PostDomain): Promise<any> {
    try {
      await this.db.collection('posts').doc(post.id).set(post);
      return 'Update success';
    } catch (e) {
      throw e;
    }
  }
  async delete(id: string): Promise<any> {
    try {
      await this.db.collection('posts').doc(id).delete();
      return 'Delete success';
    } catch (e) {
      throw e;
    }
  }
}
