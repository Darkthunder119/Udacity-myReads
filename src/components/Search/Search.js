import React from "react";
import { Link } from "react-router-dom";
import Book from "../Book/Book";
import * as BooksAPI from '../../BooksAPI';
import {debounce} from 'throttle-debounce';

export default class Search extends React.Component {
  state = {
    searchString: '',
    booksFound: ''
  };
  onSearch = (e) => {
    this.setState({ searchString: e.target.value.trimStart()});
    this.setState({ booksFound: ""});
  };
  shelfSwitcher = (event,book) =>{
    this.props.shelfSwitcher(event,book);
  }
  componentDidUpdate() {
    if (this.state.searchString && !this.state.booksFound) {
      const debouncerSearch = debounce(300, false, () => {
        BooksAPI.search(this.state.searchString).then((data) =>
          this.setState({ booksFound: data })
        );
      });
      debouncerSearch();
    }
  }
  render() {
    console.log(this.state.booksFound, 'search');
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.searchString}
              onChange={this.onSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.booksFound && Array.isArray(this.state.booksFound) ? (
              this.state.booksFound.map((val, i) => (
                <li key={i}>
                  <Book book={val} shelfSwitcher={this.shelfSwitcher}/>
                </li>
              ))
            ) : (
              <></>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
