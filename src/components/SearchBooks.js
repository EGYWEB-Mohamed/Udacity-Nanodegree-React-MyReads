import React, {Component} from 'react';

class SearchBooks extends Component {
    handleChange = (event) => this.props.changeShelf(this.props.book, event.target.value);
    RemoveBookFromShelf = (event) => this.props.RemoveBookFromShelf(this.props.book, 'none',this.props.inputValue);
    render() {
        const { book,shelf } = this.props;
        let bgImage = book.imageLinks ? book.imageLinks.thumbnail : 'icons/book-placeholder.svg'
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${bgImage})`
                            }}
                        />
                        <div className="book-shelf-changer">
                            <select value={shelf} onChange={this.handleChange}>
                                <option value="move" disabled>
                                    Move to...
                                </option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                        {book.authors ? book.authors.join(', ') : 'Unknown Author'}
                    </div>
                    {
                        ( book.shelf ) ?
                            <button style={{
                                width: '100%',
                                color: 'white',
                                backgroundColor: 'red',
                                borderColor: 'red'
                            }} onClick={this.RemoveBookFromShelf}>Remove Book</button>
                            : ''
                    }
                </div>
            </li>
        )
    }
}

export default SearchBooks