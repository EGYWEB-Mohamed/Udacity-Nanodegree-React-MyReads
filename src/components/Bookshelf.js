import React, { Component } from 'react';
import Book from './Books';
class Bookshelf extends Component {
  render() {
    const { shelf, Allbooks, changeShelf, RemoveBookFromShelf } = this.props;
    const books = Allbooks.filter((book) => book.shelf === shelf.key);
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.value}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <Book
                key={book.id}
                book={book}
                shelf={shelf.key}
                changeShelf={changeShelf}
                RemoveBookFromShelf={RemoveBookFromShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default Bookshelf;