import { Error as MongooseErrorNamespace } from 'mongoose';

const DEFAULT_ERR = 'Something very unexpected happened! Opps...';
export const extractErrors = (error: any): string[] => {
  if (error instanceof MongooseErrorNamespace.ValidationError) {
    return Object.values(error.errors).map((e: any) => e.message);
  }
  if (error && error.message) {
    return [error.message];
  }
  return [DEFAULT_ERR];
};
