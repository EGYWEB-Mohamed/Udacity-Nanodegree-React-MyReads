import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route, Routes} from "react-router-dom";
import Search from "./components/search";
import List from "./components/List";

class BooksApp extends React.Component {
    state = {
        books: [],
    }

    render() {
        return (
            <div className="app">
                <Routes>
                    <Route path="/" element={<List boos={this.state.books}/>}/>
                    <Route path="/search" element={<Search/>} />
                </Routes>
            </div>
        )
    }
}

export default BooksApp
