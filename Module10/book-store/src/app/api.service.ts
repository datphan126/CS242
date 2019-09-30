import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private ADD_NEW_BOOK_API = 'http://localhost:8080/book';
  private ADD_NEW_BIRTHDAY_CARD_API = 'http://localhost:8080/birthdayCard';
  private FETCH_BOOK_API = 'http://localhost:8080/books';
  private FETCH_BIRTHDAY_CARD_API = 'http://localhost:8080/birthdayCards';

  constructor(private httpClient: HttpClient) { }

  addNewBook(book: { title: string, isbn: string; author: string; picture: string, price: number }) {
    return this.httpClient.post(this.ADD_NEW_BOOK_API, book);
  }

  addNewBirthdayCard(card: { title: string, material: string; picture: string, price: number }) {
    return this.httpClient.post(this.ADD_NEW_BIRTHDAY_CARD_API, card);
  }

  fetchBooks() {
    return this.httpClient.get(this.FETCH_BOOK_API);
  }

  fetchBirthdayCards() {
    return this.httpClient.get(this.FETCH_BIRTHDAY_CARD_API);
  }
}
