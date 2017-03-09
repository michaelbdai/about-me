import React from 'react'
import { connect } from 'react-redux';
import { updateInputValue, addChain, addFunction } from '../actions';
import DropZone from '../components/DropZone.jsx';
import Item from '../components/Item.jsx';

class Arguments extends React.Component {
  constructor(props) {
    // console.log('Arguments----')
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleChange(e) {
    // console.log(e.target);
    // console.log(e.target.id);
    this.props.changeInputValue(this.props.functionName, e.target.id, e.target.value)
  }
  handleSelect(functionName, index) {
    let functionArg = 
      new Array(this.props.functionList[functionName].length).fill(undefined)
    this.props.selectFunction(functionName, functionArg, this.props.functionName, index)
  }
  render() {
    let counter = this.props.functionsArg[this.props.functionName].length;
    return (
      <div>
        <Item
          functionName={this.props.functionName}
          key={this.props.functionName}
          style={{width: `${Math.floor(80 / (counter + 1))}`}}
        />
        <form onSubmit={this.handleSubmit}>
          {this.props.functionsArg[this.props.functionName]
            .map((useless, index, array) => (
              <DropZone
                handleSelect={this.handleSelect}
                index={index}
                key={index}
                isForm={true}
                width={`${Math.floor(80 / (counter + 1))}%`}
              >
                <input
                  type="text"
                  key={index} 
                  onChange={this.handleChange}
                  id={index}
                  className="memo"
                  placeholder="enter value/drag a icon"
                />
              </DropZone>
            ))
          }
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  functionsArg: state.functionsArg,
  functionList: state.functionList,
})
const mapDispatchToProps = (dispatch) => ({
  changeInputValue: (functionName, argIndex, value) => {
    dispatch(updateInputValue(functionName, argIndex, value));
  },
  selectFunction: (functionName, functionArg, targetFunction, argIndex) => {
    dispatch(addFunction(functionName, functionArg));
    dispatch(addChain(functionName, targetFunction, argIndex));
  },
})

Arguments = connect(mapStateToProps, mapDispatchToProps)(Arguments);
export default Arguments;
