import React, {Component} from 'react'
import {BrowserRouter as Router, Link} from "react-router-dom";
import {withRouter} from 'react-router';
import { Redirect } from 'react-router-dom'

class Suggestions extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {redirect: false};
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
      }

    renderRedirect = (r) => {
        if (this.state.redirect) {
          return <Redirect to={`articles/${r.objectID}`}/>
        }
      }

    render(){
        if(!this.props.results) return(<div></div>);
        const hits = this.props["results"].map(r => (
            <div key={r.objectID}class="container border-solid">
                <Router>
                    <div className="hit-title"><Link to={`articles/${r.objectID}` } >{r.title}</Link></div>
                    {/* <div className="hit-title"><p onClick={this.setRedirect}>{r.title}</p></div> {this.renderRedirect()} */}
                </Router>
             </div>
        ));
        
        return <div class="bg-red-50"><ul>{hits}</ul></div>
        
    
    }
}



export default withRouter(Suggestions)


