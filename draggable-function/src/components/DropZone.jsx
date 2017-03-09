import React from 'react'

class DropZone extends React.Component {
  //callback function and index are passed to this component
  //when callback function is excecuted, the index is passed by argument
  //then parent component can identify which DropZone triggered callback function 
  constructor(props) {
    // console.log('called dropzone')
    super(props);
    this.state = {
      selected: null,
    };
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
  }
  handleDrop(e) {
    // console.log('enter-drop')
    e.target.style.border = "2px solid #0087F7";
    if (this.state.selected === null) {
      let functionName = e.dataTransfer.getData('functionName');
      // console.log(functionName);
      this.setState({
        selected: functionName,
      })
      this.props.handleSelect(functionName, this.props.index);
    }
  }
  handleDragEnter(e) {
    // console.log('enter-enter')
  }
  handleDragLeave(e) {
    if (this.state.selected === null) {
      e.target.style.border = "2px dashed #0087F7";
    }
  }
  handleDragOver(e) {
    // console.log('enter-over')
    if (this.state.selected === null) {
      e.target.style.border = "2px dashed red";
    }
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy'; 
  }
  render() {
    return (<div
      className="dropzone"
      style={{width: this.props.width || '100%'}}
      onDrop={this.handleDrop}
      onDragEnger={this.handleDragEnter}
      onDragLeave={this.handleDragLeave}
      onDragOver={this.handleDragOver}
    >
      { 
        this.props.isForm && this.state.selected !== null ? 
        <div className="memo"> {this.state.selected} </div> 
        :
        this.props.children
      }
    </div>);

  }  
}


export default DropZone;
