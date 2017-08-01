import React from 'react';

import NewsLink from './NewsLink.jsx';

const NewsView = (props) => (
  <div id="newsWindow">
    <h3>Current News</h3>
    {props.articles.map(article =>
      <NewsLink key={article._id} article={article}/>
    )}
  </div>

)

export default NewsView;
