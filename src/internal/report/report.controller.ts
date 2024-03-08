import {
  Controller,
  Get,
  Inject,
  Headers,
  Post,
  Put,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { Report, ReportInterop } from '../../domain/report.domain';

@Controller('v1/report')
export class ReportController {
  constructor(@Inject('ReportInterop') private interop: ReportInterop) {}

  @Get()
  async getAllReport(@Headers() headers: any, @Query('page') page: number) {
    return this.interop.getAll(headers['authorization'], page);
  }

  @Get('status')
  async getAllReportByStatus(
    @Headers() headers: any,
    @Query('status') status: string,
    @Query('page') page: number,
  ) {
    return this.interop.getAllByStatus(headers['authorization'], page, status);
  }

  @Post()
  async createReport(@Body() report: Report, @Headers() headers: any) {
    return this.interop.create(headers['authorization'], report);
  }

  @Put()
  async updateReport(@Headers() headers: any, @Query('id') id: string) {
    return this.interop.update(id, headers['authorization']);
  }
}
