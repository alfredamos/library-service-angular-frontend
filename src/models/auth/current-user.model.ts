import { UserType } from "./user-type.model";
import { Gender } from "./gender.model";

export class CurrentUserDto {
  name!: string;
  email!: string;
  phone!: string;
  gender?: Gender;
  userType?: UserType;
  departmentId!: string;
}
