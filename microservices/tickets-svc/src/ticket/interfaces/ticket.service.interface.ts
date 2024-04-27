export interface ITicketService {
  create(data: any): Promise<any>;
  get(id: string): Promise<any>;
  list(): Promise<any>;
  summary(): Promise<any>;
  performance(): Promise<any>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
}
