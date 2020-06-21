import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookList from "./components/BookList/BookList";
import { Route } from "react-router-dom";
import Search from "./components/Search/Search";
import {throttle} from 'throttle-debounce';

class BooksApp extends React.Component {
  state = {
    bookList: "",
    currBook: "",
    bookState: "",
  };
  //the following function fetches the current Book and the current value set to it from the Select element in the Book Component
  shelfSwitcher = (event, book) => {
    this.setState({ currBook: book });
    this.setState({ bookState: event.target.value });
  };
  componentDidMount() {
    BooksAPI.getAll().then((data) => this.setState({ bookList: data }));
  }

  componentDidUpdate() {
    //the following checks to see if the currBook state exists, aka if a book's shelf has been set, it sends a throttled Put request to the API and then retrieves the list of books on the shelves again
    if (this.state.currBook) {
      const throttlePut = throttle(50, false, ()=>{BooksAPI.update(this.state.currBook, this.state.bookState).then(
        (info) => {
          BooksAPI.getAll().then((data) =>
            this.setState({ bookList: data, currBook: "", bookState: "" })
          );
        }
      )});
      throttlePut();
    }
  }
  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={(props) => (
            <Search {...props} shelfSwitcher={this.shelfSwitcher} bookList={this.state.bookList}/>
          )}
        />
        <Route
          exact
          path="/"
          render={(props) =>
            this.state.bookList && (
              <BookList
                {...props}
                bookList={this.state.bookList}
                shelfSwitcher={this.shelfSwitcher}
              />
            )
          }
        />
      </div>
    );
  }
}

export default BooksApp;
