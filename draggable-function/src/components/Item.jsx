import React from 'react';
import { connect } from 'react-redux';

class Item extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props.functionName);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }
  handleDragStart(e) {
    e.target.style.opacity = '0.4';
    // console.log('drag start----', this.props.functionName);
    e.dataTransfer.setData("functionName", this.props.functionName);
  }
  handleDragEnd(e) {
    e.target.style.opacity = '1';
  }
  render() {
    // console.log('Item render')
    return (
      <div 
        className="column" 
        draggable="true"
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
      >       
        {this.props.functionName}
      </div>
    );
  }
};
 
export default Item;
