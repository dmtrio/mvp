import React from 'react';

import NewsView from './NewsView.jsx';
import * as NewsModel from '../models/news.js';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      articles: [],
    }

  }

  componentDidMount() {
    NewsModel.loadNews((articles) => {
      this.setState({
        articles: articles
      })
    })

  }


  render() {
    return (
      <div>
        <NewsView articles={this.state.articles} />
      </div>
      )
  }

}

export default App;
