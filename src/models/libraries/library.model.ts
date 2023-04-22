import {Category} from "./category.model";

export class LibraryDto {
  id = "";
  requesterCategory!: Category
  userId!: string;
  bookId!: string;
  dateBookOut?: Date;
  dateBookDue?: Date;
  dateBookReturn?: Date;
}
