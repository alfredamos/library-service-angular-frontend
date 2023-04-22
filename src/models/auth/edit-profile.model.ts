import { Gender } from "./gender.model";
import { UserType } from "./user-type.model";

export class EditProfileDto{
  name!: string;
  email!: string;
  phone!: string;
  gender?: Gender;
  password!: string;
  userType?: UserType;
  departmentId!: string;
}
