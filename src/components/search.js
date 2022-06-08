import React, {Component} from 'react';
import {Link} from "react-router-dom";
import SearchBooks from "./SearchBooks";

class Search extends Component {
    state = {
        inputValue: '',
    };
    handleChange = event => {
        const val = event.target.value;
        this.setState({ value: val }, () => {
            if (val.length >= 1) {
                this.props.onSearch(val);
            }
        });
        if (val.length === 0) {
            this.props.ResetSearch()
        }
    };
    render() {
        const { searchBooks,changeShelf,books  } = this.props;

        const updatedBooks = searchBooks.map(book => {
            books.map(b => {
                if (b.id === book.id) {
                    book.shelf = b.shelf;
                }
                return b;
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
                            value={this.state.value}
                            placeholder="Search by title or author"
                            onChange={this.handleChange}
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
                                <SearchBooks key={book.id} book={book} shelf={book.shelf ? book.shelf : 'none'} changeShelf={changeShelf}/>
                            ))}
                        </ol>
                    }
                </div>
            </div>
        )
    }
}
export default  Search;