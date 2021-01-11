import './App.css';
import React, {Component} from 'react'
import SearchBar from './SearchBar.js';
import algoliasearch from 'algoliasearch';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class Results extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {hits: []}
  }

  async load() {

    const client = algoliasearch('ULLLONFQHA', 'a7f9cb9b7ada1454ae619fe15b2d5325');
    const index = client.initIndex('prod_ARTICLES');
    var query = this.props.location.search.replace("?q=", "");

    index.search(query, {
      attributesToRetrieve: ['title', 'subtitle'],
      hitsPerPage: 50,
    }).then(({ hits }) => {
      console.log(hits);
      this.setState({hits: hits});
    });
  }

  componentDidMount() {
    this.load();
  }

  render() {
      return (
        <div>
            <SearchBar></SearchBar>
            <h1 class="font-bold text-4xl text-blue-800">Results</h1>
            <ResultsPage results={this.state.hits}></ResultsPage>

        </div>
     );}
}


class ResultsPage extends Component {

  constructor(props) {
    super(props);
    this.props = props;
}

  render(){
    if(!this.props["results"].length) return(<div>No results found.</div>);
    const hits = this.props["results"].map(r => (


        <div key={r.objectID} class="container border-solid grid grid-cols-2">
           <div>
            <FontAwesomeIcon icon={faExternalLinkAlt} />
           </div>
           <div class="col-span-2"> 
           <Router>
                <div className="hit-title">
                  <Link to={`articles/${r.objectID}`} ><h1 class="text-2xl text-blue-800">{r.title}</h1></Link>
                  <p>{r.subtitle}</p>
                  </div>
            </Router>
           </div>
         </div>
    ));
    
    return <div class="p-8">
      <ul>{hits}</ul>
      {/* <p>{this.props["results"].length} articles found</p> */}
      </div>
  }
}


//   return <h1>Hello {props.match.params.username}!</h1>;


export default Results;


