import { FUNCTIONS } from '../functionList.js';
const copyOfArray = (arr) => {
  let result = [];
  for (let i = 0; i < arr.length; i++ ){
    let element = arr[i];
    if (Array.isArray(element)){
      element = copyOfArray(element);
    } else if (typeof element === 'object') {
      element = copyOfObj(element);
    } 
    result.push(element);
  }
  return result;
}

const copyOfObj = (obj) => {
  let result = {};
  for (let key in obj) {
    let value = obj[key];
    if (Array.isArray(value)) {
      value = copyOfArray(value); 
    } else if (typeof value === 'object') {
      value = copyOfObj(value);
    }
    result[key] = value;
  }
  return result;
}
const initialState = {
  // expressionAreaArray: [true],
  functionList: FUNCTIONS,
  selectedFunctions: [], //array of function name
  functionsArg: {}, //{function1:[arr1, arr2, ...], function2: ..., ..}
  functionsChain: {}, //{function2:[function1, 2]}, 2 => result pass to 2nd arg of function 1 
}
let functionsArgCopy
export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EXP_AREA': 
      return {
        ...state,
        expressionAreaArray: state.expressionAreaArray.concat([true])
      };
    case 'ADD_FUNCTION': 
      functionsArgCopy = copyOfObj(state.functionsArg);
      functionsArgCopy[action.functionName] = action.functionArg;
      return {
        ...state,
        selectedFunctions: state.selectedFunctions.concat(action.functionName),
        functionsArg: functionsArgCopy,
      };
    case 'UPDATE_INPUTVALUE':
      functionsArgCopy = copyOfObj(state.functionsArg);
      functionsArgCopy[action.functionName][action.argIndex] = action.value;
      return {
        ...state,
        functionsArg: functionsArgCopy,
      };
    case 'ADD_CHAIN':
      let functionsChainCopy = copyOfObj(state.functionsChain);
      functionsChainCopy[action.currentFunction] = [action.targetFunction, action.argIndex];
      return {
        ...state,
        functionsChain: functionsChainCopy,
      };
    case 'RESET' : 
      return initialState;
    default:
      return state;      
  }
}