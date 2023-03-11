import { UserRole } from "./user-role.enum";

export interface JwtUser {
  sub: string;
  roles: [UserRole];
  exp: number;
  iat: number;
}
