import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route,Routes} from "react-router-dom";
import Search from "./components/search";
import List from "./components/List";

class BooksApp extends React.Component {
    state = {
        books: [],
    }
    shelves = [
        {key: 'currentlyReading', name: 'Currently Reading'},
        {key: 'wantToRead', name: 'Want to Read'},
        {key: 'read', name: 'Have Read'},
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

    render() {
        return (
            <div className="app">
                <Routes>
                    <Route path="/" element={<List books={this.state.books} shelves={this.shelves} changeShelf={this.changeBookShelf}/>}/>
                    <Route path="/search" element={<Search/>}/>
                </Routes>
            </div>
        )
    }
}

export default BooksApp
