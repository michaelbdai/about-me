export class FunctionReverseLinkedList {
  constructor(){
    this.head = null;
    this.tail = null
  }
  addToTail(node) {
    if(!this.head) {
      this.head = node;
    }
    if(this.tail) {
      node.previous = this.tail;
    }
    this.tail = node
  }
  removeTail() {
    let previousTail = this.tail;
    if (this.tail) {
      this.tail = this.tail.previous;
    }
    return previousTail;
  }
  excecuteAll(){
    let value, index;
    while (this.tail) {
      let tailNode = this.removeTail();
      index = tailNode.indexForPrevious;
      try {
        value = tailNode.excecute(index, value);
      } catch(e) {
        console.log(e);
        break;
      }
    }
    return value
  }
}
export class FunctionNode {
  constructor(cb, arg = [], indexForPrevious) {
    this.cb = cb,
    this.arg = arg;
    this.indexForPrevious = indexForPrevious;
    this.previous = null;
  }
  excecute(index, value) {
    if (index !== undefined) {
      this.arg[index] = value;
    }
    return this.cb(...this.arg)
  }
}
// var functionList = new FunctionReverseLinkedList();
// node1 = new FunctionNode(FUNCTIONS.test3, [null]);
// node2 = new FunctionNode(FUNCTIONS.test2, [100, null], 0);
// node3 = new FunctionNode(FUNCTIONS.test1, [3, 55], 1);
// functionList.addToTail(node1);
// functionList.addToTail(node2);
// functionList.addToTail(node3);
// functionList.excecuteAll();

// export FunctionReverseLinkedList;
// export FunctionNode;
let copyOfArray = (arr) => {
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

let copyOfObj = (obj) => {
  let result = {};
  for (key in obj) {
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










