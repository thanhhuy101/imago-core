import { Injectable } from '@nestjs/common';
import {
  AllReport,
  Report,
  ReportRepository,
} from '../../../../domain/report.domain';
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
        updatedAt: null,
        status: 'pending',
      } as Report)
      .then();
  }

  async getAll(page: number): Promise<AllReport> {
    const reportRef = this.db.collection('reports');
    const snapshot = await reportRef.get();
    const reports = snapshot.docs.map((doc) => doc.data() as Report);
    const size = 9;
    return {
      data: reports.slice((page - 1) * size, page * size),
      endPage: Math.ceil(reports.length / size),
    };
  }

  async getAllByStatus(status: string, page: number): Promise<AllReport> {
    const reportRef = this.db.collection('reports');
    const snapshot = await reportRef.where('status', '==', status).get();
    const reports = snapshot.docs.map((doc) => doc.data() as Report);
    const size = 9;
    return {
      data: reports.slice((page - 1) * size, page * size),
      endPage: Math.ceil(reports.length / size),
    };
  }

  update(id: string) {
    let reportRef = this.db.collection('reports').doc(id);
    reportRef.update({ status: 'completed', updatedAt: new Date() }).then();
  }
}
