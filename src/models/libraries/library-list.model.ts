import { BookDto } from "../books/book.model";
import { UserDto } from "../users/user.model";
import { LibraryDto } from "./library.model";

export class LibraryListDto extends LibraryDto{
  book?: BookDto;
  user?: UserDto;
}
