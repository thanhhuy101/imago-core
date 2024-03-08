import { Injectable } from '@nestjs/common';
import { Report, ReportRepository } from '../../../../domain/report.domain';
import * as admin from 'firebase-admin';
import { Auth } from '../../../../domain/auth.domain';
@Injectable()
export class FirestoreService implements ReportRepository {
  private db: admin.firestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }
  async getList(page: number): Promise<any> {
    const size = 10;
    let auth = await this.db.collection('auths').get();
    let report = await this.db.collection('reports').get();
    let result: any[] = [];
    auth.forEach((doc) => {
      let data = doc.data() as Auth;
      let reportData = report.docs.find((p) => p.id === data.id);
      if (data.role === 'admin') {
        if (reportData) {
          result.push({
            ...data,
            report: reportData.data(),
          });
        }
      }
    });
    return {
      data: result.slice((+page - 1) * size, +page * size),
      endPage: Math.ceil(result.length / size),
    };

    
  }

  create(report: Object) {
    let reportRef = this.db.collection('reports').doc();
    reportRef
      .set({
        ...report,
        id: reportRef.id,
        createdAt: new Date(),
        status: 'pending',
      } as Report)
      .then();
  }

  async getAll(): Promise<Report[]> {
    let reports: Report[] = [];
    const snapshot = await this.db.collection('reports').get();
    snapshot.forEach((doc) => {
      reports.push(doc.data() as Report);
    });
    return reports;
  }

  update(id: string) {
    let reportRef = this.db.collection('reports').doc(id);
    reportRef.update({ status: 'completed' }).then();
  }

 
}
