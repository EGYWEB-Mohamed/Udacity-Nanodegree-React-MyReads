import React, {Component} from 'react';
import {Link} from "react-router-dom";
import SearchBooks from "./SearchBooks";

class Search extends Component {
    handleSearch = event => this.props.handleSearch(event.target.value);
    render() {
        const { searchBooks,changeShelf,books,RemoveBookFromShelf,searchInput  } = this.props;

        const updatedBooks = searchBooks.map(book => {
            books.map(oldBook => {
                if (oldBook.id === book.id) {
                    book.shelf = oldBook.shelf;
                }
                return oldBook;
            });
            return book;
        });
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            value={searchInput}
                            placeholder="Search by title or author"
                            onChange={this.handleSearch}
                            autoFocus
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {searchBooks.length === 0 ? <h1 style={{
                        color:"red",
                        textAlign:'center'
                    }
                    }>No Books To Show , Try Search Input Above ♥</h1> :
                        <ol className="books-grid">
                            {updatedBooks.map(book => (
                                <SearchBooks inputValue={searchInput} key={book.id} book={book} shelf={book.shelf ? book.shelf : 'none'} changeShelf={changeShelf} RemoveBookFromShelf={RemoveBookFromShelf}/>
                            ))}
                        </ol>
                    }
                </div>
            </div>
        )
    }
}
export default  Search;