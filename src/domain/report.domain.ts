export interface Report {
  type: string;
  reason: string[];
  status: string;
  id: string;
  typeId: string;
  content: string;
  createdAt: Date;
}

export interface ReportPagination {
  data: Report[];
  endPage: number;
}

export interface ReportRepository {
  create(report: Object): any;

  update(id: string): any;

  getAll(): Promise<Report[]>;

  getList(page: number ): Promise<any>;
}

export interface ReportUseCase {
  create(report: Object): any;

  update(id: string): any;

  getAll(): Promise<Report[]>;

  getList(page: number ): Promise<any>;
}

export interface ReportInterop {
  create(token: string, report: Object): any;

  update(id: string, token: string): any;

  getAll(token: string): Promise<Report[]>;
  getList(token: string,page: number ): Promise<any>;
}
