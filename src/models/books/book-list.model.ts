import { AuthorDto } from '../authors/author.model';
import { BookCatDto } from '../categories/book-category.model';
import { BookDto } from './book.model';

export class BookListDto extends BookDto {
  author?: AuthorDto;
  category?: BookCatDto;
}
