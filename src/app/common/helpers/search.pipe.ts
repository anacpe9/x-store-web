import { Book } from '../models/books';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(books: Book[], filter: string): Book[] {
    if (!books || !filter) {
      return books;
    }

    const filterLower = filter.toLowerCase();
    return books.filter((book,) => ((book.title.toLowerCase().indexOf(filterLower) > -1) || (book.author.toLowerCase().indexOf(filterLower) > -1)));
  }

}
