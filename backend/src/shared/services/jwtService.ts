import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { IJwtService } from '../../domain/services/IJwtService';
import { injectable } from 'tsyringe';

@injectable()
export class JwtService implements IJwtService {
    private secret = process.env.JWT_SECRET;
    private expiresIn = (process.env.JWT_EXPIRES_IN || '1d') as SignOptions['expiresIn'];

    sign(payload: object): string {
        return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
    }

    verify(token: string): string | JwtPayload {
        return jwt.verify(token, this.secret);
    }
}