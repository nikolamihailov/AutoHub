import { Role } from './user.model';

export interface UserAuthResponse {
  user: {
    _id: string;
    email: string;
    role: Role;
  };
  token: string;
}

export interface UserAuthErr {
  error: {
    errors: string[];
  };
}
