import { Role } from '../../auth/role.enum';

export interface User {
  id: number;
  phoneNumber: string;
  password: string;
  roles?: Role[];
}