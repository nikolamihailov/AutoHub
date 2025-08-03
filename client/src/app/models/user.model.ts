export interface User {
  email: string;
  password: string;
  accountType: string;
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export enum AccountType {
  PRIVATE_ACCOUNT = 'privateAccount',
  DEALERSHIP = 'dealership',
}
