import React from 'react';

import ReactionButton from './ReactionButton.jsx';
import * as Reactions from '../models/reactions.js';


class NewsLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      like: false,
      likeCount: '',
      happy: false,
      happyCount: '',
    }

    this.addReaction = this.addReaction.bind(this);

  }

  //handle loading current reactions count
  componentDidMount() {
    var id = this.props.id
    Reactions.reactionsCount(id, (article) => {
      this.setState({
        likeCount: article.likes.length,
        happyCount: article.happy.length
      });
    })
  }


  //handle clicking on reactions button
  addReaction(e, reaction) {
    console.log(reaction);
    var id = this.props.id
    var obj = {
      userId: "5980dcb6a0d8425414e8d199",
      urlId: id,
      reaction: reaction
    }
    Reactions.reactions(obj, () => {
      console.log('success');
    });
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
        <ReactionButton name={'likes'} count={this.state.likeCount} addReaction={this.addReaction}/>
        <ReactionButton name={'happy'} count={this.state.happyCount} addReaction={this.addReaction}/>
        {/* <ReactionButton name={'frown'} /> */}
        <img src={art.urlToImage} />
      </div>
    )
  }
}

export default NewsLink;
