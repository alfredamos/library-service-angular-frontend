import { DepartmentDto } from "../departments/department.model";
import { UserDto } from "./user.model";

export class UserListDto extends UserDto{
  department?: DepartmentDto;
}
