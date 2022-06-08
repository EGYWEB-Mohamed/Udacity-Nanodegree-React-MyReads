import React, {Component} from 'react';
import Bookshelf from "./Bookshelf";
import {Link} from "react-router-dom";

class List extends Component {
    render() {
        const {books,shelves,changeShelf,RemoveBookFromShelf} = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>My Books Library</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map(shelf => (
                            <Bookshelf key={shelf.key} shelf={shelf} Allbooks={books} changeShelf={changeShelf} RemoveBookFromShelf={RemoveBookFromShelf}/>
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'><button>Add a book</button></Link>
                </div>
            </div>
        )
    }
}

export default List