import { Inject, Injectable } from '@nestjs/common';
import {
  Report,
  ReportRepository,
  ReportUseCase,
} from '../../../../domain/report.domain';

@Injectable()
export class BaseServiceUseCase implements ReportUseCase {
  constructor(
    @Inject('ReportRepository') private reportRepository: ReportRepository,
  ) {}
 async getList(page: number): Promise<any> {
   let skip: number;
   const reportRef = await this.reportRepository.getList(page);
   skip = reportRef.endPage;
    if (page < 1) {
      throw 'ErrorMinusPage';
    } else if (page === undefined || page === null || isNaN(page)) {
      throw 'ErrorEmptyPage';
    } else if (page > skip) {
      throw 'ErrorEmptyPageData';
    } else {
      return reportRef;
    }
  }

  create(report: Object) {
    this.reportRepository.create(report);
  }

  getAll(): Promise<Report[]> {
    return this.reportRepository.getAll();
  }

  update(id: string) {
    this.reportRepository.update(id);
  }
}
