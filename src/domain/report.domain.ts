export interface Report {
  type: string;
  reason: string[];
  status: string;
  id: string;
  typeId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
}

export interface AllReport {
  data: Report[];
  endPage: number;
}

export interface ReportRepository {
  create(report: Object): any;

  update(id: string): any;

  getAll(page: number): Promise<AllReport>;

  getAllByStatus(status: string, page: number): Promise<AllReport>;
}

export interface ReportUseCase {
  create(report: Object): any;

  update(id: string): any;

  getAll(page: number): Promise<AllReport>;

  getAllByStatus(status: string, page: number): Promise<AllReport>;
}

export interface ReportInterop {
  create(token: string, report: Object): any;

  update(id: string, token: string): any;

  getAll(token: string, page: number): Promise<AllReport>;

  getAllByStatus(
    token: string,
    page: number,
    status: string,
  ): Promise<AllReport>;
}
