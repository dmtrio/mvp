import React from 'react';

import ReactionButton from './ReactionButton.jsx';
import * as Reactions from '../models/reactions.js';


class NewsLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      likeCount: '',
      happyCount: '',
      dinoCount: '',
      rickCount: ''
    }

    this.addReaction = this.addReaction.bind(this);
    this.updateReactionsCount = this.updateReactionsCount.bind(this)

  }

  updateReactionsCount(id) {
    Reactions.reactionsCount(id, (article) => {
      // for (var likeId of article.likes) {
      //   if (likeId === userId) {

      //    }
      // }
      this.setState({
        likeCount: article.likes.length,
        happyCount: article.happy.length,
        dinoCount: article.dino.length,
        rickCount: article.rick.length

      });
    })
  }

  //handle loading current reactions count
  componentDidMount() {
    var id = this.props.id
    this.updateReactionsCount(id);
  }


  //handle clicking on reactions button
  addReaction(e, reaction) {
    e.preventDefault();
    console.log(reaction);
    var id = this.props.id
    var obj = {
      urlId: id,
      reaction: reaction
    }
    Reactions.reactions(obj, () => {
      this.updateReactionsCount(id);
    });
  }




  render() {
    var art = this.props.article
    return (
      <div className="newslinkdiv">
        <div className="newslinkdivcontent">
          <div>
            <a href={art.url}><h3>{art.title}</h3></a>
            <h4>{art.publishedAt}</h4>
            <p>{art.description}</p>
          </div>
          <ReactionButton name={'likes'} count={this.state.likeCount} addReaction={this.addReaction}/>
          <ReactionButton name={'happy'} count={this.state.happyCount} addReaction={this.addReaction}/>
          <ReactionButton name={'dino'} count={this.state.dinoCount} addReaction={this.addReaction}/>
          <ReactionButton name={'rick'} count={this.state.rickCount} addReaction={this.addReaction}/>

        </div>
        <img src={art.urlToImage} />
      </div>
    )
  }
}

export default NewsLink;
