import './App.css';

import Navbar from './navbar.js';
import Article from './article.js';
import Search from './search.js';
import Results from './results.js';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

function App() {
  return (
    <div className="App">
    <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Search}/>
          <Route path="/articles/:id" component={withRouter(Article)} />
          <Route path="/search" component={withRouter(Results)} />
        </Switch>
    </Router>
    </div>



  );
}

export default App;
