import { Inject, Injectable } from '@nestjs/common';
import { Report, ReportRepository, ReportUseCase } from '../../../../domain/report.domain';

@Injectable()
export class BaseServiceUseCase implements ReportUseCase{

  constructor(@Inject('ReportRepository') private reportRepository: ReportRepository) {
  }
  create(report: Report): Promise<Report> {
    return this.reportRepository.create(report);
  }

  getAll(): Promise<Report[]> {
    return this.reportRepository.getAll();
  }

  update(id: string): Promise<Report> {
    return this.reportRepository.update( id);
  }
}
