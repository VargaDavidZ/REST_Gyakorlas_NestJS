import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { STATUS_CODES } from 'http';

@Injectable()
export class BooksService {


  #myBooks = [
    {
      id: 1,
      title: "my title",
      author: "my authors",
      isbn: "isbn",
      publishYear: 1999,
      reserved: false
    },
    {
      id: 2,
      title: "my title2",
      author: "my authors2",
      isbn: "isbn2",
      publishYear: 120041,
      reserved: false
    },
    {
      id: 3,
      title: "my title3",
      author: "my authors3",
      isbn: "isbn3",
      publishYear: 199991,
      reserved: false
    }
  ]

  create(createBookDto: CreateBookDto) {

    let data = {
      id: this.#myBooks.length + 1,
      title: createBookDto.title,
      author: createBookDto.author,
      isbn: createBookDto.isbn,
      publishYear: createBookDto.publishYear,
      reserved: false
    }


    this.#myBooks.push(data)


    return this.findAll();
  }

  findAll() {
    return this.#myBooks;
  }

  findOne(id: number) {
    if(!this.#myBooks.find((book) => book.id == id))
      {
        throw new NotFoundException("No product with ID");
      }
    return JSON.stringify( this.#myBooks.find((book) => book.id == id))
  }

  update(id: number, updateBookDto: UpdateBookDto) {

    if(!this.#myBooks.find((book) => book.id == id))
      {
        throw new NotFoundException("No product with ID");
      }
   

    for(let i = 0; i < this.#myBooks.length; i++)
    {

      if(this.#myBooks[i].id == id)
      {
        let data = {
          id: this.#myBooks[i].id,
          title: updateBookDto.title == null ? this.#myBooks[i].title : updateBookDto.title,
          author: updateBookDto.author == null ? this.#myBooks[i].author : updateBookDto.author,
          isbn: updateBookDto.isbn == null ? this.#myBooks[i].isbn : updateBookDto.isbn,
          publishYear: updateBookDto.publishYear == null ? this.#myBooks[i].publishYear : updateBookDto.publishYear,
          reserved: updateBookDto.reserved == null ? this.#myBooks[i].reserved : updateBookDto.reserved
        }
        this.#myBooks[i] = data;
        return JSON.stringify(this.#myBooks.find((book) => book.id == id));
      }
      
    }

    return this.#myBooks.find((book) => book.id == id);
  }

  remove(id: number) {

    if(!this.#myBooks.find((book) => book.id == id))
      {
        throw new NotFoundException("No product with ID");
      }
    for(let i = 0; i < this.#myBooks.length; i++ )
      {
        if(this.#myBooks[i].id == id)
        {
          this.#myBooks.splice(i,1)
        }
      }

  
  }
}
