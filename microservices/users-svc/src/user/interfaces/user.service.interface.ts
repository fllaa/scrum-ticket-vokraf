export interface IUserService {
  create(data: any): Promise<any>;
  get(id: string): Promise<any>;
  delete(id: string): Promise<any>;
}
