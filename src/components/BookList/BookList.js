import React from "react";
import Book from "../Book/Book";

export default function BookList(props) {
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
                  .map((val, i) => (
                    <li key={i}>
                      <Book book={val} />
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
                  .map((val, i) => (
                    <li key={i}>
                      <Book book={val} />
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
                  .map((val, i) => (
                    <li key={i}>
                      <Book book={val} />
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <button>Add a book</button>
      </div>
    </div>
  );
}
