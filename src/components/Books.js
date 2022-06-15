import React, {Component} from 'react';

class Books extends Component {
    handleChange = (event) => this.props.changeShelf(this.props.book, event.target.value);
    RemoveBookFromShelf = (event) => this.props.RemoveBookFromShelf(this.props.book, 'none');
    render() {
        const { book,shelf } = this.props;
        let bgImage = book.imageLinks ? book.imageLinks.thumbnail : 'icons/placeholder.png'
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={{
                                width: 128,
                                height: 192,
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
                    <button style={{
                        width: '100%',
                        color: 'white',
                        backgroundColor: 'red',
                        borderColor: 'red'
                    }} onClick={this.RemoveBookFromShelf}>Remove Book</button>
                </div>
            </li>
        )
    }
}

export default Books