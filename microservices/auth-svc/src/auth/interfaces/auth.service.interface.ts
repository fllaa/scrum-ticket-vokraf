export interface IAuthService {
  login(data: any): Promise<any>;
  register(data: any): Promise<any>;
}
