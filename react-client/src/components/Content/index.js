import React from 'react';
import './index.scss';

const Content = (props) => {
  return(
    <div className="content">
      {props.children}
    </div>
  )
}

export default Content;