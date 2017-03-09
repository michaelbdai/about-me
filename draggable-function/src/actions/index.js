export const addExpressionArea = () => ({
  type: 'ADD_EXP_AREA',

});
export const addFunction = (functionName, functionArg) => {
  // console.log('addFunction Action', functionName, functionArg);
  return {
    type: 'ADD_FUNCTION',
    functionName,
    functionArg,
  }
}
export const updateInputValue = (functionName, argIndex, value) => {
  // console.log('updateInputValue', functionName, argIndex, value);
  return {
    type: 'UPDATE_INPUTVALUE',
    functionName,
    argIndex,
    value,
  }
}
export const addChain = (currentFunction, targetFunction, argIndex) => {
  return {
    type: 'ADD_CHAIN',
    currentFunction,
    targetFunction,
    argIndex,
  }
}

export const resetAll = () => {
  return {
    type: 'RESET',
  }
}