import React from 'react';

const ReactionButton = (props) => (
  <div className="button w3-btn">

    {/* <img src=`./res/${props.name}.png` name={props.name} onClick={(e)=>{props.addReaction(e, e.target.name)}}>{props.name}</img> */}
    <a href="#" onClick={(e)=>{props.addReaction(e, e.target.name)}} >
      <img name={props.name} src={"./res/" + props.name + ".png"} />
      <span>{props.count}</span>
    </a>
  </div>
  )

export default ReactionButton;
