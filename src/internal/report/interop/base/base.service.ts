import { Inject, Injectable } from '@nestjs/common';
import {
  AllReport,
  Report,
  ReportInterop,
  ReportUseCase,
} from '../../../../domain/report.domain';
import { AuthUseCase } from '../../../../domain/auth.domain';

@Injectable()
export class BaseServiceInterop implements ReportInterop {
  constructor(
    @Inject('ReportUseCase') private useCase: ReportUseCase,
    @Inject('AuthUseCase') private authUseCase: AuthUseCase,
  ) {}

  async create(token: string, report: Object) {
    try {
      await this.authUseCase.verifyToken(token);
      this.useCase.create(report);
    } catch (e) {
      throw e;
    }
  }

  async getAll(token: string, page: number): Promise<AllReport> {
    try {
      await this.authUseCase.verifyToken(token);
      return this.useCase.getAll(page);
    } catch (e) {
      throw e;
    }
  }

  async update(id: string, token: string) {
    try {
      await this.authUseCase.verifyToken(token);
      this.useCase.update(id);
    } catch (e) {
      throw e;
    }
  }
}
