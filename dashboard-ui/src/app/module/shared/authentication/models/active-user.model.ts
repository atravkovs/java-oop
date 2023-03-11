import { UserRole } from "./user-role.enum";

export interface ActiveUser {
  email: string;
  role: UserRole;
}
