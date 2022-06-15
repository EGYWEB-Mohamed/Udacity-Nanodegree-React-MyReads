import Swal from 'sweetalert2'
import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route, Routes } from "react-router-dom";
import Search from "./components/search";
import List from "./components/List";

class BooksApp extends React.Component {
    state = {
        books: [],
        searchBooks: [],
        searchInput: ''
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

    changeShelf = (book, shelf) => {
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
                    Swal.fire({
                        icon: 'success',
                        title: 'This Book Moved Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
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
    handleSearch = (value) => {
        if (value.length >= 1) {
            this.setState({
                searchInput: value
            })
            this.onSearch(value);
        } else {
            this.setState({ searchBooks: [] });
        }
    }
    onSearch = value => {
        BooksAPI.search(value).then(books => {
            books.error ? this.setState({ searchBooks: [] }) : this.setState({ searchBooks: books })
        });
    }
    RemoveBookFromShelf = (book,shelf,inputValue) =>{

        Swal.fire({
            title: 'Are you sure?',
            text: 'Are You Sure You Want To Remove '+ book.title +' To ' + shelf,
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, Remove It It'
        }).then((result) => {
            if (result.isConfirmed) {
                BooksAPI.update(book, shelf).then((response) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'This Book Removed Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    book.shelf = shelf;
                    this.setState(prevState => ({
                        books: prevState.books.filter((OldBook) => {
                            return OldBook.id !== book.id
                        }).concat(book),
                        searchInput:'',
                        searchBooks : []
                    }));
                });
            }
        })
    }
    render() {
        const {books, searchBooks,searchInput} = this.state;

        return (
            <div className="app">
                <Routes>
                    <Route path="/"
                           element={<List books={books} shelves={this.shelves} changeShelf={this.changeShelf} RemoveBookFromShelf={this.RemoveBookFromShelf}/>}/>
                    <Route path="/search"
                           element={<Search searchInput={searchInput} handleSearch={this.handleSearch} searchBooks={searchBooks} changeShelf={this.changeShelf} books={books}
                                            onSearch={this.onSearch} ResetSearch={this.ResetSearch}  RemoveBookFromShelf={this.RemoveBookFromShelf}/>}/>
                </Routes>
            </div>
        )
    }
}

export default BooksApp
