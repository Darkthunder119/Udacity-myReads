import React from "react";
import Book from "../Book/Book";
import {Link} from 'react-router-dom';

export default function BookList(props) {
  const shelfSwitcher=(event,book)=>{
    props.shelfSwitcher(event,book);
  }
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {props.bookList
                  .filter((val) => val.shelf === "currentlyReading")
                  .map((val) => (
                    <li key={val.id}>
                      <Book book={val} shelfSwitcher={shelfSwitcher} />
                    </li>
                  ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {props.bookList
                  .filter((val) => val.shelf === "wantToRead")
                  .map((val) => (
                    <li key={val.id}>
                      <Book book={val} shelfSwitcher={shelfSwitcher} />
                    </li>
                  ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {props.bookList
                  .filter((val) => val.shelf === "read")
                  .map((val) => (
                    <li key={val.id}>
                      <Book book={val} shelfSwitcher={shelfSwitcher} />
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search"><button>Add a book</button></Link>
      </div>
    </div>
  );
}
