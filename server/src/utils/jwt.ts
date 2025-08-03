import { promisify } from 'util';
import * as jsonwebtoken from 'jsonwebtoken';

export const jwt = {
  sign: promisify(jsonwebtoken.sign) as unknown as (
    payload: string | Buffer | object,
    secretOrPrivateKey: jsonwebtoken.Secret,
    options?: jsonwebtoken.SignOptions
  ) => Promise<string>,

  verify: promisify(jsonwebtoken.verify) as (
    token: string,
    secretOrPublicKey: jsonwebtoken.Secret,
    options?: jsonwebtoken.VerifyOptions
  ) => Promise<object | string>,
};
