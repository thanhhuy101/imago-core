import { Inject, Injectable } from '@nestjs/common';
import {
  StorageDomain,
  StorageRepository,
} from '../../../domain/storage.domain';
import * as admin from 'firebase-admin';

import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class RepositoryService implements StorageRepository {
  storage: admin.storage.Storage;
  constructor(){
    this.storage = admin.storage();
  }

  //how to upload a file to firebase storage
  async uploadFile(files: Express.Multer.File[], storage: StorageDomain): Promise<string[]> {
    //how to upload a file to firebase storage
    const bucket = this.storage.bucket('gs://itss-imago-0000.appspot.com');
    const publicUrls: string[] = [];

    if (storage.fileName != undefined) {
      for (const file of files) {
        // const uid = this.authInterop.get(storage.fileName, storage.token);
        const fileUpload = bucket.file(`images/${storage.fileName}/${storage.userId}/${storage.id}/${file.originalname}`);
        const blobStream = fileUpload.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        const imageUrl = await new Promise((resolve, reject) => {
          blobStream.on('finish', async () => {
            const [url] = await fileUpload.getSignedUrl({
              action: 'read',
              expires: '01-01-2124',
            });
            resolve(url);
          });
          blobStream.on('error', (error) => {
            reject(`Unable to upload image, something went wrong`);
          });
          blobStream.end(file.buffer);
        });
        if (typeof imageUrl === 'string') {
          publicUrls.push(imageUrl);
        }
      }
    } else {
      console.log("Undefined!")
    }
    return publicUrls;
  }

}