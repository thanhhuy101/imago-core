import { Inject, Injectable } from '@nestjs/common';
import {
    CommentNotificationDomain,
    FollowNotificationDomain, LikeNotificationDomain,
    NotificationDomain,
    NotificationRepository,
    NotificationUseCase,
} from '../../../../domain/notification.domain';

@Injectable()
export class NotificationUseCaseBaseService implements NotificationUseCase {

    constructor(@Inject('NotificationRepository') private notificationRepository: NotificationRepository){
    }
    async create(notification: NotificationDomain): Promise<boolean> {
        if (!this.validateNotification(notification)) {
            return false;
        }
        return this.notificationRepository.create(notification);
    }
    async getNotificationsByUid(uid: string): Promise<NotificationDomain[]> {
        return this.notificationRepository.getNotificationsByUid(uid);
    }
    async getNotificationsByFollow(uid: string): Promise<FollowNotificationDomain[]> {
        let notifications = await this.notificationRepository.getNotificationsByUid(uid);
        if(!notifications){
            return [];
        }
        let data : FollowNotificationDomain[] = [];

        return this.assignNotification(notifications, data);
    }
    async getNotificationsByLike(uid: string): Promise<LikeNotificationDomain[]> {
        let notifications = await this.notificationRepository.getNotificationsByUid(uid);
        if(!notifications){
            return [];
        }
        let data :LikeNotificationDomain[] = [];
        return this.assignNotification(notifications, data);

    }
    async getNotificationsByComment(uid: string): Promise<CommentNotificationDomain[]> {
        let notifications = await this.notificationRepository.getNotificationsByUid(uid);
        if(!notifications){
            return [];
        }
        let data :CommentNotificationDomain[] = [];
        return this.assignNotification(notifications, data);
    }

    public validateNotification(notification: NotificationDomain): boolean {
        if (!notification.id || notification.id.trim() === '') {
            return false;
        }
        if (!notification.createdAt) {
            return false;
        }
        if (!notification.uid || notification.uid.trim() === '') {
            return false;
        }
        if (!notification.sender || notification.sender.trim() === '') {
            return false;
        }
        if (notification.isFollow === undefined) {
            return false;
        }
        if (notification.isLike === undefined) {
            return false;
        }
        return notification.isComment !== undefined;
    }

    private assignNotification(notification: NotificationDomain[], data: any[]): any[] {
        for(let i = 0; i < notification.length; i++){
            data[i].id = notification[i].id;
            data[i].createdAt = notification[i].createdAt;
            data[i].uid = notification[i].uid;
            data[i].postId = notification[i].postId;
            data[i].sender = notification[i].sender;
        }
        return data;
    }
}
