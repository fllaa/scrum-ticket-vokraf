export interface IUserAuthService {
  login(data: any): Promise<any>;
  register(data: any): Promise<any>;
}
