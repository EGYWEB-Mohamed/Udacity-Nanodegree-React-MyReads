import React, {Component} from 'react';
import Bookshelf from "./Bookshelf";

class List extends Component {
    render() {
        const {books,shelves,changeShelf} = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>My Books Library</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map(shelf => (
                            <Bookshelf key={shelf.key} shelf={shelf} Allbooks={books} changeShelf={changeShelf}/>
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <button onClick={() => this.setState({showSearchPage: true})}>Add a book</button>
                </div>
            </div>
        )
    }
}

export default List