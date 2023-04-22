export class BookDto {
  id = "";
  isbn!: string;
  title!: string;
  publisher!: string;
  edition!: string;
  volume!: string;
  bookCatId!: string;
  quantity!: number;
  dateOfPublication!: Date;
  authorId!: string;
}
