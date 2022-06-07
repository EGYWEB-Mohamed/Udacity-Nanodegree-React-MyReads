import React, {Component} from 'react';
import Book from "./Books";

class Bookshelf extends Component {
    render() {
        const { shelf,Allbooks,changeShelf } = this.props;
        const ShelfBooks = Allbooks.filter(book => book.shelf === shelf.key)
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {ShelfBooks.map(book => (
                            <Book key={book.id} book={book} shelf={shelf.key} changeShelf={changeShelf}/>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Bookshelf