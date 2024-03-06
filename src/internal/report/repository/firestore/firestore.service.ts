import { Injectable } from '@nestjs/common';
import { Report, ReportRepository } from '../../../../domain/report.domain';
import * as admin from 'firebase-admin';

@Injectable()
export class FirestoreService implements ReportRepository {
  private db: admin.firestore.Firestore;

  constructor() {
    this.db = admin.firestore();
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
