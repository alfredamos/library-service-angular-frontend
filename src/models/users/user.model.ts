import { UserType } from '../../models/auth/user-type.model';
import { Gender } from '../../models/auth/gender.model'

export class UserDto {
  id = "";
  name!: string;
  email!: string;
  phone!: string;
  gender?: Gender;
  userType?: UserType;
  departmentId!: string;
}
