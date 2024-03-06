import { Injectable } from '@nestjs/common';
import { Hashtag, HashtagRepository } from '../../../domain/hashtag.domain';
import * as assmin from 'firebase-admin';
import * as admin from 'firebase-admin';

@Injectable()
export class RepositoryService implements HashtagRepository {
  // @ts-ignore
  hashtag: assmin.hashtag.Hashtag;
  db = admin.firestore();

  constructor() {
    // @ts-ignore
    this.hashtag = assmin.hashtag;
  }

  async create(tag: Hashtag): Promise<Hashtag> {
    try {
      const db = this.hashtag;

      // @ts-ignore
      return await this.db.collection('hashtags').doc(tag.tag).set(tag);
    } catch (error) {
      throw error;
    }
  }

  async get(tag: string): Promise<Hashtag> {
    try {
      const doc = await this.db.collection('hashtags').doc(tag).get();
      return doc.data() as Hashtag;
    } catch (error) {
      throw error;
    }
  }

  async list(): Promise<Hashtag[]> {
    try {
      const hashtags = await this.db.collection('hashtags').get();
      return hashtags.docs.map((doc) => doc.data() as Hashtag);
    } catch (error) {
      throw error;
    }
  }

  async update(tag: Hashtag): Promise<Hashtag> {
    try {
      const db = this.hashtag;
      // @ts-ignore
      return await this.db.collection('hashtags').doc(tag.tag).update(tag);
    } catch (error) {
      throw error;
    }
  }
}
