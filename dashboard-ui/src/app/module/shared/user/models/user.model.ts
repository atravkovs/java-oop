import { UserRole } from "./user-role.enum";

export interface User {
  name: string;
  email: string;
  surname: string;
  role: UserRole;
}
