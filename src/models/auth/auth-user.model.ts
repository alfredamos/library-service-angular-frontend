import { UserType } from "./user-type.model";
import { CurrentUserDto } from "./current-user.model";

export class AuthUser {
  id!: string;
  name!: string;
  userType!: UserType;
  message?: string;
  token?: string;
  isLoggedIn?: boolean;
  isAdmin?: boolean;
  user?: CurrentUserDto;
}
