import React from 'react';

import * as NewsModel from '../models/news.js';


class NewsLink extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    var art = this.props.article
    return (
      <div className="newslinkdiv">
        <div>
          <a href={art.url}><h3>{art.title}</h3></a>
          <h4>{art.publishedAt}</h4>
          <p>{art.description}</p>
        </div>
        <img src={art.urlToImage} />

      </div>
//
//       "author": "Ashley Parker, Carol D. Leonnig, Philip Rucker, Tom Hamburger, Ashley Parker, Carol D. Leonnig, Philip Rucker, Tom Hamburger",
// "title": "Trump dictated son’s misleading statement on meeting with Russian lawyer",
// "description": "Some advisers are worried that the president’s direct involvement leaves him needlessly vulnerable to allegations of a coverup.",
// "url": "https://www.washingtonpost.com/politics/trump-dictated-sons-misleading-statement-on-meeting-with-russian-lawyer/2017/07/31/04c94f96-73ae-11e7-8f39-eeb7d3a2d304_story.html",
// "urlToImage": "https://img.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2017/07/31/National-Politics/Images/Botsford170111Trump10200-crop2.JPG?t=20170517",
// "publishedAt": "2017-07-31T12:46:00Z"
    )

  }

}

export default NewsLink;
