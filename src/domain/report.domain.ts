export interface Report {
  type: string;
  reason: string[];
  status: string;
  id: string;
  typeId: string;
  content: string;
}

export interface ReportRepository {
  create(report: Report): Promise<Report>;
  update(id: string): Promise<Report>;
  getAll(): Promise<Report[]>;
}

export interface ReportUseCase {
  create(report: Report): Promise<Report>;
  update(id: string): Promise<Report>;
  getAll(): Promise<Report[]>;
}

export interface ReportInterop {
  create(report: Report): Promise<Report>;
  update(id: string, token: string): Promise<Report>;
  getAll(token: string): Promise<Report[]>;
}


