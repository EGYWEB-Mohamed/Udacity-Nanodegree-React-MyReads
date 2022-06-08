import React, {Component} from 'react';

class SearchBooks extends Component {
    state = {
        value: this.props.shelf
    };
    handleChange = event => {
        const { value } = event.target;
        this.setState({ value });
        this.props.changeShelf(this.props.book, value);
    };
    render() {
        const { book } = this.props;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${
                                    book.imageLinks
                                        ? book.imageLinks.thumbnail
                                        : 'icons/book-placeholder.svg'
                                })`
                            }}
                        />
                        <div className="book-shelf-changer">
                            <select value={this.state.value} onChange={this.handleChange}>
                                <option value="move" disabled>
                                    Move to...
                                </option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                        {book.authors ? book.authors.join(', ') : 'Unknown Author'}
                    </div>
                </div>
            </li>
        )
    }
}

export default SearchBooks