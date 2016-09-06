$(document).ready(function() {
  function fizzBuzz (num){
    var arrRes = []
    for (var i = 1; i <= num; i ++){
      if (i % 15 === 0) {
        arrRes.push("fizz buzz");
      }else if(i % 3 === 0){
        arrRes.push("fizz");
      }else if (i % 5 === 0){
        arrRes.push("buzz")
      }else{
        arrRes.push(i);
      }
    }
    return arrRes;
  }
  $("body").text('fizzBuzz 30 is ->' + fizzBuzz(30));
});
