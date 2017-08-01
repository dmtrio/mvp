import React from 'react';

const ReactionButton = (props) => (
  <div>
    <a href="#" className="button" name={props.name} onClick={(e)=>{props.addReaction(e, e.target.name)}}>{props.name}</a>
    <p>{props.count}</p>
  </div>
  )

export default ReactionButton;
