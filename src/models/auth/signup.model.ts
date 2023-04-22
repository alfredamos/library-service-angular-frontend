import { Gender } from "./gender.model";
import { UserType } from "./user-type.model";

export class SignupDto {
  name!: string;
  email!: string;
  phone!: string;
  gender?: Gender;
  password!: string;
  confirmPassword!: string;
  userType?: UserType;
  departmentId!: string;
}
