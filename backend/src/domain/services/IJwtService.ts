import { JwtPayload } from "jsonwebtoken";

export interface IJwtService {
    sign(payload: object, expiresIn?: string): string;
    verify(token: string): string | JwtPayload;
}
