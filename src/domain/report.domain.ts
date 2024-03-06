export interface Report {
  type: string;
  reason: string[];
  status: string;
  id: string;
  typeId: string;
  content: string;
  createdAt: Date;
}

export interface ReportRepository {
  create(report: Object): any;

  update(id: string): any;

  getAll(): Promise<Report[]>;
}

export interface ReportUseCase {
  create(report: Object): any;

  update(id: string): any;

  getAll(): Promise<Report[]>;
}

export interface ReportInterop {
  create(token: string, report: Object): any;

  update(id: string, token: string): any;

  getAll(token: string): Promise<Report[]>;
}
