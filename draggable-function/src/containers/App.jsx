import React from 'react';
import List from './List.jsx';
import ExpressionArea from './ExpressionArea.jsx';
import { connect } from 'react-redux';
import {resetAll} from '../actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
    }
    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
  }
  handleClick() {
    let arg = this.props.functionsArg;
    let chain = this.props.functionsChain;
    let list = this.props.selectedFunctions.slice(0);
    let fnArray = this.props.selectedFunctions;
    let fnDB = this.props.functionList;
    let result = '';
    const rec = (arr, index = null, value = null) => {
      if (arr.length === 0) {
        return;
      } else {
        let output;
        let errorMessage;
        let fnName = arr.pop();
        let args = arg[fnName].slice(0);
        if (!!index && !!value) {
          args[index] = JSON.stringify(value);
        }
        try {
          output = fnDB[fnName].apply(null, args.map(a => JSON.parse(a)))
        } catch(e) {
          errorMessage = 
            `Find error from function ${fnName}. \n 
            Error type: ${e.name}. \n
            Error message: ${e.message} \n`
        }
        if (errorMessage) {
          result += errorMessage;
          return result; 
        } else {
          result += `Get result from function ${fnName} => ${JSON.stringify(output)} \n`;
          if (chain[fnName]) {
            rec(arr, chain[fnName][1], output);
          } else {
            return;
          }
        }
      }
    };
    rec(list);
    this.setState({
      result: result,
    })
  }
  reset() {
    this.props.reset();
    this.rend();
  }
  render() {
    return (
      <div className="container">
        <List />
        <ExpressionArea key={0} />
        {this.props.selectedFunctions.slice(1).map((functionName, index) => (
          <ExpressionArea
            key={index}
            index={index}
            functionName={functionName}
          />
        ))}
        <div className="button" onClick={this.handleClick}>
          Click to Calculate
        </div>       
        <div className="result">
          {this.state.result.split('\n').map(item => 
            <p>{item}</p> 
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedFunctions: state.selectedFunctions,
  functionsArg: state.functionsArg,
  functionsChain: state.functionsChain,
  functionList: state.functionList,
})
const mapDispatchToProps = (dispatch) => ({
  reset: () => {
    dispatch(resetAll())
  },
})
App = connect(mapStateToProps, mapDispatchToProps)(App);
export default App
