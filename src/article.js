import './App.css';
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import algoliasearch from 'algoliasearch';

class Article extends Component {

    constructor(props) {
        super(props);
        this.state = {title: '', subtitle: '', text: ''};
      }

    async load() {

        const client = algoliasearch('ULLLONFQHA', 'a7f9cb9b7ada1454ae619fe15b2d5325');
        const index = client.initIndex('prod_ARTICLES');
    
        var objectID = this.props.location.pathname.split("/").pop();

        index.getObject(objectID)
            .then(obj => {
            console.log(obj);

            this.setState({
                title: obj.title,
                subtitle: obj.subtitle,
                text: obj.text
              });
        });
    }

    componentDidMount() {
        this.load();
      }

      componentWillReceiveProps(nextProps) {
        console.log('props');
        }

    render() {
        return (
            <div class="container:md p-6">
                <h1 class="font-bold text-4xl text-blue-800 p-6">{this.state.title}</h1>
                <h3 class="font-bold text-2xl text-grey-600 p-6">{this.state.subtitle}</h3>
                <p class="text-left">{this.state.text}</p>
            </div>
        );
    }
  
}

export default Article;

// export default withRouter(Article);
// export default withRouter(connect({}));


