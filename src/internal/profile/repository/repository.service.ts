import { Injectable } from '@nestjs/common';
import {
  ErrorProfileNotFound,
  Profile,
  ProfileRepository,
} from 'src/domain/profile.domain';
import * as admin from 'firebase-admin';

@Injectable()
export class RepositoryService implements ProfileRepository {
  db: admin.firestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  async getProfile(id: string): Promise<Profile> {
    try {
      const profile = await this.db.collection('profiles').doc(id).get();
      if (!profile.exists) {
        throw ErrorProfileNotFound;
      } else {
        return profile.data() as Profile;
      }
    } catch (error) {
      throw error;
    }
  }

  async createProfile(profile: Profile): Promise<boolean> {
    try {
      await this.db.collection('profiles').doc(profile.id).set(profile);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(profile: Profile): Promise<boolean> {
    try {
      // Lưu thông tin profile vào Firestore
      await this.db.collection('profiles').doc(profile.id).set(profile);
  
      // Kiểm tra nếu profile 1 không muốn theo dõi profile 2
      if (!profile.followers.includes(profile.id)) {
        // Lấy thông tin profile cũ từ dữ liệu mới ghi vào Firestore
        const updatedProfileDoc = await this.db.collection('profiles').doc(profile.id).get();
        const updatedProfileData = updatedProfileDoc.data() as Profile;
  
        // Xóa ID của profile 1 khỏi mảng followers của profile 2
        const updatedFollowers = updatedProfileData.followers.filter(id => id !== profile.id);
        await this.db.collection('profiles').doc(profile.id).update({
          followers: updatedFollowers
        });
  
        // Xóa ID của profile 2 khỏi mảng following của profile 1
        const updatedFollowing = profile.following.filter(id => id !== profile.id);
        await this.db.collection('profiles').doc(profile.id).update({
          following: updatedFollowing
        });
      } else {
        // Thêm ID của profile hiện tại vào mảng following của profile 1 (profile)
        if (!profile.following.includes(profile.id)) {
          profile.following.push(profile.id);
          await this.db.collection('profiles').doc(profile.id).update({
            following: profile.following
          });
        }
  
        // Thêm ID của profile 1 vào mảng followers của profile hiện tại (updatedProfileData)
        const updatedProfileDoc = await this.db.collection('profiles').doc(profile.id).get();
        const updatedProfileData = updatedProfileDoc.data() as Profile;
        if (!updatedProfileData.followers.includes(profile.id)) {
          updatedProfileData.followers.push(profile.id);
          await this.db.collection('profiles').doc(profile.id).update({
            followers: updatedProfileData.followers
          });
        }
      }
  
      return true;
    } catch (error) {
      throw error;
    }
  }
  
}
