import { Injectable } from '@nestjs/common';
import { PostDomain, PostRepository } from 'src/domain/post.domain';
import * as admin from 'firebase-admin';
@Injectable()
export class RepositoryService implements PostRepository {
  private db: admin.firestore.Firestore;
  constructor() {
    this.db = admin.firestore();
  }

  async getPost(id: string): Promise<PostDomain> {
    const post = await this.db.collection('posts').doc(id).get();
    console.log(id);
    // console.log(post.data());
    return post.data() as PostDomain;
  }
  async getPostsByUid(creatorId: string): Promise<PostDomain[]> {
    const post = await this.db.collection('posts').doc(creatorId).get();
    return post.data() as PostDomain[];
  }
  async getSharedPost(uid: string): Promise<PostDomain[]> {
    const postsRef = this.db.collection('posts');
    const query = postsRef.where('share', 'array-contains', uid);
    const snapshot = await query.get();
    const posts = snapshot.docs.map((doc) => doc.data() as PostDomain);
    return posts;
  }
  async getPostsByCateId(uid: string): Promise<PostDomain[]> {
    const posts = await this.db
      .collection('posts')
      .where('cateId', 'array-contains', uid)
      .get();
    return posts.docs.map((doc) => doc.data() as PostDomain);
  }
  async createPost(post: PostDomain): Promise<boolean> {
    try {
      await this.db.collection('posts').doc(post.id).set(post);
      return true;
    } catch (e) {
      throw e;
    }
  }
  async updatePost(post: PostDomain): Promise<boolean> {
    try {
      await this.db.collection('posts').doc(post.id).set(post);
      return true;
    } catch (e) {
      throw e;
    }
  }
  async deletePost(id: string): Promise<boolean> {
    try {
      await this.db.collection('posts').doc(id).delete();
      return true;
    } catch (e) {
      throw e;
    }
  }
}
