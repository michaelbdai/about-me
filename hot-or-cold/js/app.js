
$(document).ready(function(){
//   console.log('document ready');
   var correctNum = generateNum();
   var countGuess = 0;
   var displayText = [];
	/*--- Display information modal box ---*/

   function resetVariables(){
      correctNum = generateNum();
      countGuess = 0;
      displayText = ['Make your Guess!',0];
      $('form')[0].reset();
      $("#feedback").text(displayText[0]);
      countGuess = displayText[1];
      $('#count').text(countGuess);
      $('#guessList').text('');
   }
   function generateNum(){
      return Math.round(Math.random() * (100 - 1) + 1)
   }
   function guessRes(correctNum, guessNum,countGuess){
      // console.log('correctNum is: ' + correctNum);
      // console.log('guessNum is: ' + guessNum);
      if (isNaN(Number(guessNum)) || guessNum ==='' || guessNum ===' '){
         alert('Please enter a number');
         return ['Please enter a number',countGuess];
      }
      var difference = Math.abs(correctNum - Number(guessNum));
      if (difference >= 50){
         return ["Ice cold",countGuess + 1];
      }else if (difference >= 30){
         return ["cold",countGuess + 1];
      }else if (difference >= 20){
         return ["warm",countGuess + 1];
      }else if (difference >= 10){
         return ["hot",countGuess + 1];
      }else if (difference >= 1){
         return ["very hot",countGuess + 1];
      }else{
         $(".final-result").fadeIn(1000);
         return ["you win",countGuess + 1];

      }
   }
   /*--- Display information modal box ---*/

   $(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	});
   /*--- Hide information modal box ---*/
   $(".overlay a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});
   $(".final-result a.close").click(function(){
      resetVariables();
      $(".final-result").fadeOut(1000);
   });
   $(".new").click(function(){
      resetVariables();
   });
   $("form").submit(function(){
      event.preventDefault();
      // console.log('clicked guessButton');
      console.log('correctNum: ' + correctNum);
      $('#guessList').append(
         '<li>' + $('#userGuess').val() + '</li>'
      );
      var displayText = guessRes(correctNum,$('#userGuess').val(),countGuess);
      $("#feedback").text(displayText[0]);
      countGuess = displayText[1];
      $('#count').text(countGuess);
      $('form')[0].reset();
      // console.log('displayText: ' + displayText);

   })
});
