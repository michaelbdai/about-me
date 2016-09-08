
$(document).ready(function(){
	var correctNum;
	/*--- Display information modal box ---*/

   function generateNum(){
      return Math.round(Math.random() * (100 - 1) + 1)
   }
   function guessRes(correctNum, guessNum){
      var difference = Math.abs(correctNum - guessNum);
      if (difference >= 50){
         return "Ice cold";
      }else if (difference >= 30){
         return "cold";
      }else if (difference >= 20){
         return "warm";
      }else if (difference >= 10){
         return "hot";
      }else if (difference >= 1){
         return "very hot";
      }else{return "you win"}
   }
   /*--- Display information modal box ---*/
   $(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});
   /*--- Hide information modal box ---*/
   $("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});
   $(".new").click(function(){
      correctNum = generateNum();
      //reset()
   });
   $("#guessButton").click(function(){


   })





});
