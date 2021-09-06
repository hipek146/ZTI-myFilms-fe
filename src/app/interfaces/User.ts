export interface User {
  login: string;
  password?: any;
  name: string;
  surname: string;
  role: 'USER' | 'ADMIN';
}
