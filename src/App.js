import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route, Routes} from "react-router-dom";
import Search from "./components/search";
import List from "./components/List";

class BooksApp extends React.Component {
    state = {
        books: [],
        searchBooks: []
    }
    shelves = [
        {key: 'currentlyReading', name: 'Currently Reading'},
        {key: 'wantToRead', name: 'Want to Read'},
        {key: 'read', name: 'Read'},
    ];
    componentDidMount = () => {
        BooksAPI.getAll()
            .then(books => {
                this.setState({books: books});
            });
    };

    changeBookShelf = (book, shelf) => {
        BooksAPI.update(book, shelf);
        if (shelf === 'none') {
            this.setState(prevState => ({
                books: prevState.books.filter(b => b.id !== book.id)
            }));
        } else {
            book.shelf = shelf;
            this.setState(prevState => ({
                books: prevState.books.filter(b => b.id !== book.id).concat(book)
            }));
        }
    };
    onSearch = value => {
        if (value.length > 0) {
            BooksAPI.search(value).then(books => {
                if (books.error) {
                    this.setState({ searchBooks: [] });
                } else {
                    this.setState({ searchBooks: books });
                }
            });
        }else {
            this.setState({ searchBooks: [] });
        }
    }
    ResetSearch = () => {
        this.setState({ searchBooks: [] });
    }
    render() {
        const {books, searchBooks} = this.state;
        return (
            <div className="app">
                <Routes>
                    <Route path="/"
                           element={<List books={books} shelves={this.shelves} changeShelf={this.changeBookShelf}/>}/>
                    <Route path="/search"
                           element={<Search searchBooks={searchBooks} changeShelf={this.changeBookShelf} books={books}
                                            onSearch={this.onSearch} ResetSearch={this.ResetSearch}/>}/>
                </Routes>
            </div>
        )
    }
}

export default BooksApp
