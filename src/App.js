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
  shelfSwitcher = (event, book) => {
    this.setState({ currBook: book });
    this.setState({ bookState: event.target.value });
  };
  componentDidMount() {
    BooksAPI.getAll().then((data) => this.setState({ bookList: data }));
  }

  componentDidUpdate() {
    if (this.state.currBook) {
      const throttlePut = throttle(50, false, ()=>{BooksAPI.update(this.state.currBook, this.state.bookState).then(
        (info) => {
          console.log(info);
          BooksAPI.getAll().then((data) =>
            this.setState({ bookList: data, currBook: "", bookState: "" })
          );
        }
      )});
      throttlePut();
    }
  }
  render() {
    console.log(this.state.bookList, 'hi from App render');
    return (
      <div className="app">
        <Route
          path="/search"
          render={(props) => (
            <Search {...props} shelfSwitcher={this.shelfSwitcher} />
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
