$(document).ready(function() {
  function fizzBuzz (num, var1, var2, text1, text2){
    var arrRes = []
    for (var i = 1; i <= num; i ++){
      if (i % (var1 * var2) === 0) {
        arrRes.push(text1 + text2);
      }else if(i % var1 === 0){
        arrRes.push(text1);
      }else if (i % var2 === 0){
        arrRes.push(text2)
      }else{
        arrRes.push(i);
      }
    }
    return arrRes;
  }
  function getInput(callBack){
    var num = prompt("How many number do you want to count?","1000");
    var var1 = parseInt(prompt('What is \'fizz value\'?', 3));
    var var2 = parseInt(prompt("What is 'buzz value'?", 5));
    var text1 = prompt("What is 'fizz text'?", "fizz");
    var text2 = prompt("What is 'buzz text'?", "buzz");
    return callBack(num, var1, var2, text1, text2);
  }

  $(".fizz1").text('fizzBuzz 30 is -> ' + fizzBuzz(30,3,5,"fizz","buzz"));
  $(".fizz2").text('Try the new fizzBuzz is -> ' + getInput(fizzBuzz));




});
