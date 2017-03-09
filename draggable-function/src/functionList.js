export const FUNCTIONS = {
  sumOfTwo: (arg1, arg2) => {
    console.log('test1');
    return arg1 + arg2;
  },
  sumOfThree: (arg1, arg2, arg3) => {
    console.log('test2');
    return arg3 + arg1 + arg2;
  },
  consoleLogInput: (cb) => {
    console.log('test3');
    console.log(`Log ${cb}`);
  },
  errorFn: (arg1, cb1) => {
    throw {
      name: 'test: errorName',
      message: 'test: errorMessage'
    }
    return cb1 + arg1;
  },  
}
