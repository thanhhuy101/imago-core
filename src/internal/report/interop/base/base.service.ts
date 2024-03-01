import { Inject, Injectable } from '@nestjs/common';
import { Report, ReportInterop, ReportUseCase } from '../../../../domain/report.domain';
import {AuthUseCase} from '../../../../domain/auth.domain';

@Injectable()
export class BaseServiceInterop implements ReportInterop{

  constructor(@Inject('ReportUseCase') private useCase: ReportUseCase,
              @Inject('AuthUseCase') private authUseCase: AuthUseCase) {
  }

  create(report: Report): Promise<Report> {
    return this.useCase.create(report);
  }

  async getAll(token: string): Promise<Report[]> {
    try {
      await this.authUseCase.verifyToken(token);
      return this.useCase.getAll();
    }
    catch (e) {
      throw e;
    }
  }

  async update( id: string, token: string): Promise<Report> {
    try {
      await this.authUseCase.verifyToken(token);
      return this.useCase.update( id);
    }
    catch (e) {
      throw e;
    }
  }
}
