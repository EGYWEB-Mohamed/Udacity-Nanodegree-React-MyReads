import Swal from 'sweetalert2'
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
        {key: 'currentlyReading', value: 'Currently Reading'},
        {key: 'wantToRead', value: 'Want To Read'},
        {key: 'read', value: 'Read'},
    ];
    componentDidMount = () => {
        BooksAPI.getAll()
            .then(books => {
                this.setState({books: books});
            });
    };

    changeBookShelf = (book, shelf) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are You Sure You Want Move '+ book.title +' To ' + shelf + ' Shelf !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Move It'
        }).then((result) => {
            if (result.isConfirmed) {
                BooksAPI.update(book, shelf).then((response) => {
                    if (shelf === 'none') {
                        Swal.fire({
                            icon: 'success',
                            title: 'This Book Removed Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'This Book Moved Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }

                    book.shelf = shelf;
                    this.setState(prevState => ({
                        books: prevState.books.filter((OldBook) => {
                            return OldBook.id !== book.id
                        }).concat(book)
                    }));
                });

            }
        })

    };
    onSearch = value => {
        BooksAPI.search(value).then(books => {
            if (books.error) {
                this.setState({ searchBooks: [] });
            } else {
                this.setState({ searchBooks: books });
            }
        });
    }
    ResetSearch = () => {
        this.setState({ searchBooks: [] });
    }
    RemoveBookFromShelf = (book,shelf) =>{

    }
    render() {
        const {books, searchBooks} = this.state;
        return (
            <div className="app">
                <Routes>
                    <Route path="/"
                           element={<List books={books} shelves={this.shelves} changeShelf={this.changeBookShelf} RemoveBookFromShelf={this.RemoveBookFromShelf}/>}/>
                    <Route path="/search"
                           element={<Search searchBooks={searchBooks} changeShelf={this.changeBookShelf} books={books}
                                            onSearch={this.onSearch} ResetSearch={this.ResetSearch}/>}/>
                </Routes>
            </div>
        )
    }
}

export default BooksApp
