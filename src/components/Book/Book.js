import React from "react";
import noImage from "../../icons/no_image_available.svg";

export default function Book(props) {
  if(props.sameBooks){
    let foundMatch = props.sameBooks.find(val=> val.id === props.book.id);
    if(foundMatch){
    props.book.shelf = foundMatch.shelf;
    }
  }

  const shelfSwitcher=(event, book)=>{
    props.shelfSwitcher(event, book);
  }
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${
              props.book.imageLinks ? props.book.imageLinks.thumbnail : noImage
            })`,
          }}
        />
        <div className="book-shelf-changer">
          <select value={props.book.shelf ? props.book.shelf : 'none'} onChange={(event)=>shelfSwitcher(event, props.book)}>
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
      <div className="book-title">{props.book.title}</div>
      {props.book.authors && (
        <div className="book-authors">{props.book.authors.join(",")}</div>
      )}
    </div>
  );
}
