import React from "react";
import * as BooksAPI from "../../BooksAPI";
import { Link } from "react-router-dom";
import Book from '../Book/Book'

export default class Search extends React.Component {

  constructor(props)
  {
    super(props)
    this.state={
        searchString: '',
        booksFound: ''
    }
  }  
  onChangeSearch = (e) =>{
    this.setState({searchString: e.target.value});
  }
  componentDidUpdate(){
      if(this.state.searchString && !this.state.booksFound){
        BooksAPI.search(this.state.searchString).then(data=>this.setState({booksFound : data}))
      }
      if(!this.state.searchString && this.state.booksFound)
      {
        this.setState({booksFound: ''})
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
            {/*
          NOTES: The search from BooksAPI is limited to a particular set of search terms.
          You can find these search terms here:
          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
          you don't find a specific author or title. Every search is limited by search terms.
        */}
            <input type="text" placeholder="Search by title or author" value={this.state.searchString} onChange={this.onChangeSearch} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"> {this.state.booksFound ? this.state.booksFound
                  .map((val, i) => (
                    <li key={i}>
                      <Book book={val}/>
                    </li>
                  )): (<></>)} </ol>
        </div>
      </div>
    );
  }
}
