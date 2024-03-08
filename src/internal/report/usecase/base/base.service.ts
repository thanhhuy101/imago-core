import { Inject, Injectable } from '@nestjs/common';
import {
  AllReport,
  Report,
  ReportRepository,
  ReportUseCase,
} from '../../../../domain/report.domain';

@Injectable()
export class BaseServiceUseCase implements ReportUseCase {
  constructor(
    @Inject('ReportRepository') private reportRepository: ReportRepository,
  ) {}

  create(report: Object) {
    this.reportRepository.create(report);
  }

  getAll(page: number): Promise<AllReport> {
    return this.reportRepository.getAll(page);
  }

  getAllByStatus(status: string, page: number): Promise<AllReport> {
    return this.reportRepository.getAllByStatus(status, page);
  }

  update(id: string) {
    this.reportRepository.update(id);
  }
}
