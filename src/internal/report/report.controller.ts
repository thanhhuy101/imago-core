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
  async getAllReport(@Headers() headers: any) {
    return this.interop.getAll(headers['authorization']);
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
