import React, {Component, useState, useEffect} from 'react';
import algoliasearch from 'algoliasearch/lite';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Suggestions from './suggestions.js';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import { Redirect } from 'react-router-dom'



class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {query: '', redirect: false};
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/search?q=${this.state.query}`}/>
    }
  }

  async search() {
    console.log(process.env.REACT_APP_API_KEY);
    const client = algoliasearch('ULLLONFQHA', process.env.REACT_APP_API_KEY);
    const index = client.initIndex('prod_ARTICLES');

    index.search(this.query, {
      attributesToRetrieve: ['title', 'subtitle'],
      hitsPerPage: 50,
    }).then(({ hits }) => {
      console.log(hits);
      this.setState({hits: hits});
    });
  }


  handleInputChange = (evt) => {

    this.setState({
      query: evt.target.value
    });

      if (this.state.query && this.state.query.length > 0) {
          this.search();
      } 

  }

  handleKeyDown = (evt) => {
    if (evt.key === 'Enter' && this.state.query && this.state.query.length > 0) {
      this.setRedirect();
    }
  }

  render() {

    return (
        <div class=" md:container">
            <div class="bg-white flex items-center rounded-full shadow-xl md:container">
              <input class="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" value={this.state.query} onChange={evt => this.handleInputChange(evt)} onKeyDown={this.handleKeyDown} placeholder="Search our articles... "/>
              <div class="p-4">
              <Link to={`/search?q=${this.state.query}`}><button class="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center" ><FontAwesomeIcon icon={faSearch} /></button></Link>
              {this.renderRedirect()}
            </div>
        </div>

        <Suggestions results={this.state.hits}/>

        </div>
    );
  }
}

export default SearchBar;




