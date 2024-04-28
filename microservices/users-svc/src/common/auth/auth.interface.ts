export interface IAuthPassword {
  salt: string;
  passwordHash: string;
}

export interface IAuthCreateToken {
  sub: string;
  email: string;
  name: string;
}
