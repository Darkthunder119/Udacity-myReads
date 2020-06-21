import React from "react";
import { Link } from "react-router-dom";
import Book from "../Book/Book";
import * as BooksAPI from '../../BooksAPI';
import {debounce} from 'throttle-debounce';

export default class Search extends React.Component {
  state = {
    searchString: '',
    booksFound: '',
    sameBooks: ''
  };
  //resetting booksFound on every search since we really don't want our componentDidUpdate to be stuck in an infinite loop as well as 
  //making sure that conditional debounced Search request goes through on "EVERY" character change.
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
    //The following checks to see if the prop bookList exists, if the current search results is an Array (this is important)
    //since the default error return is an Object state so u want to ignore Objects and if this is the case,
    //cross check the 2 lists of books for duplicates and then save the ones from the shelves aka props.bookList in state to pass down
    if(this.props.bookList && Array.isArray(this.state.booksFound) && !this.state.sameBooks){
      let shelfIds = this.state.booksFound.map(val => val.id );
      let bookIds =this.props.bookList.filter(val=>shelfIds.includes(val.id));
      this.setState({sameBooks: bookIds});
    }
  }
  render() {
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
                  <Book book={val} shelfSwitcher={this.shelfSwitcher} sameBooks={this.state.sameBooks}/>
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
