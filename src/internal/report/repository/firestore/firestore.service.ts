import { Injectable } from '@nestjs/common';
import { Report, ReportRepository } from '../../../../domain/report.domain';
import * as admin from 'firebase-admin';
@Injectable()
export class FirestoreService implements ReportRepository {
  private db: admin.firestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }
  create(report: Report): Promise<Report> {
    let reportRef = this.db.collection('reports').doc();
    report.id = reportRef.id;
    reportRef.set(report).then();
    return Promise.resolve(report);
  }

  async getAll(): Promise<Report[]> {
    let reports: Report[] = [];
    const snapshot = await this.db.collection('reports').get();
    snapshot.forEach((doc) => {
      reports.push(doc.data() as Report);
    });
    return reports;
  }

  update(id: string): Promise<Report> {
    let reportRef = this.db.collection('reports').doc(id);
    reportRef.update({ status: 'completed' }).then();
    return Promise.resolve({} as Report);
  }
}
