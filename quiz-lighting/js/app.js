
$(document).ready(function(){
   console.log('document ready');
// List of global variable:

   var quizDatabase = [
      {
         questionId:1,
         question:'Which spectrum is the one for sunlight? ',
         multChoice:[
            'A, contains all color of light, more blue than red.',
            'B, contains all color of light, more red than blue.',
            'C, contains little blue light.',
            'D, not all color of light, more blue than red.',
         ],
         correctChoice:['A'],
         explaination:'Sunlight is 5500K.',
         displayImg:'images/spectrum.PNG',
      },
      {
         questionId:2,
         question:'Which of the following is/are LED bulb(s)? see picture. ',
         multChoice:[
            'A, see picture',
            'B, see picture',
            'C, see picture',
            'D, see picture',
         ],
         correctChoice:['A','B','D'],
         explaination:'The design of the LED is very flexible.',
         displayImg:'images/bulbs.PNG',
      },
      {
         questionId:3,
         question:'How much is non-dimmable 60W equivalent LED bulb in US market? ',
         multChoice:[
            'A, $ 0.20 - $ 1.00',
            'B, $ 0.50 - $ 4.00',
            'C, $ 4.00 - $30.00',
            'D, at least $10.00',
         ],
         correctChoice:['B'],
         explaination:'I found the cheapest LED bulb on Amazon.com, $1 for two. ',
         displayImg:'images/cost-green.PNG',
      },
      {
         questionId:4,
         question:'As of 2015, what percentage of bulbs in US are still inefficient model? ',
         multChoice:[
            'A, 30%',
            'B, 50%',
            'C, 70%',
            'D, 90%',
         ],
         correctChoice:['C'],
         explaination:'Most of them are incandescent bulb. ',
         displayImg:'images/cost-green.PNG',
      },
      {
         questionId:5,
         question:'Comparing with traditional incandescent bulb, which much energy does LED bulb save? ',
         multChoice:[
            'A, 90%-80%',
            'B, 80%-70%',
            'C, 70%-60%',
            'D, 60%-50%',
         ],
         correctChoice:['A'],
         explaination:'You can light up an average living room cristal bright using LED like using one 40W incandescent bulb. ',
         displayImg:'images/cost-green.PNG',
      },
      {
         questionId:6,
         question:'What is the lifetime of LED bulbs? ',
         multChoice:[
            'A, >10 years',
            'B, 5 years',
            'C, 2 years',
            'D, 1 years',
         ],
         correctChoice:['A'],
         explaination:'It can last up to 30 years like TV. Every LED company wish they could make money like selling iPhone... ',
         displayImg:'images/cost-green.PNG',
      },
      {
         questionId:7,
         question:'Which color of light(part of spectrum) makes skin look ugly? ',
         multChoice:[
            'A, Green',
            'B, Blue',
            'C, Yellow',
            'D, Red',
         ],
         correctChoice:['C'],
         explaination:'The extra yellow skin tone make you look unheathy. A cheap way to improve it is to filter the yellow spectrum.',
         displayImg:'images/reveal.PNG',
      },
      {
         questionId:8,
         question:'Which color of light(part of spectrum) makes skin look nice and healthy? ',
         multChoice:[
            'A, Green',
            'B, Blue',
            'C, Yellow',
            'D, Red',
         ],
         correctChoice:['D'],
         explaination:'It is measured by R9 which is not listed on the LED product label. However, the CRI 90 LED usually have high R9.',
         displayImg:'images/R9.PNG',
      },
      {
         questionId:9,
         question:'For LED flash light and vehicle high light, people need it to as bright as possible. Which two major colors are these white light made of? ',
         multChoice:[
            'A, Green',
            'B, Blue',
            'C, Yellow',
            'D, Red',
         ],
         correctChoice:['B','C'],
         explaination:'Human eye is most sensitive to yellow light. Yellow plus blue makes white',
         displayImg:'images/led-highlight.PNG',
      },
      {
         questionId:10,
         question:'Which color(s) does plant absorb the most? ',
         multChoice:[
            'A, Green',
            'B, Blue',
            'C, Yellow',
            'D, Red',
         ],
         correctChoice:['B','D'],
         explaination:'Most plant appears green so it reflect green light',
         displayImg:'images/cost-green.PNG',
      },
   ];
   var correctCount = 0;
   var answerCount = 0;
   var totalQuestions = 6;
   var randomQuestions = [];
   var Quiz = []; //Per Challenge requirement!
   function getRandomArr(myArr,x){
      //console.log('loaded getRandomArr');
      //console.log(myArr);
      //the function randomly choose x amount of questions from the database
      //and the new questions in random sequence
      var arrRes = [];
      // var localMyArr = myArr.join(',').split(',');
      var localMyArr = [];
      for (var j = 0; j < myArr.length; j ++){localMyArr.push(myArr[j])};
      for(var i = 0; i < x; i ++){
         if (localMyArr.length === 0){ //to make sure return array has x element.
            for (var j = 0; j < myArr.length; j ++){localMyArr.push(myArr[j])};
         }
         var randomNum = Math.floor(Math.random() * localMyArr.length)
         var newElement = localMyArr.splice(randomNum,1);
         arrRes = arrRes.concat(newElement);
         if (arrRes[i] === arrRes[i-1]){ //make sure no repeat from previous one.
         	arrRes.pop();
         	 i --;
         }
         // console.log('localMyArr: ' + localMyArr);
         // console.log('myArr: ' + myArr);
         // console.log('arrRes: ' + arrRes + ' end of for loop.');
      }
      // console.log(arrRes);
      // console.log(localMyArr);
      // console.log(myArr);
      return arrRes;
   }
   function loadQuestion(questionObj){
      //console.log(questionObj);
      $('.game #question').text(questionObj.question);
      $('.game #label-A').text(questionObj.multChoice[0]);
      $('.game #label-B').text(questionObj.multChoice[1]);
      $('.game #label-C').text(questionObj.multChoice[2]);
      $('.game #label-D').text(questionObj.multChoice[3]);
      $(".display-img").html("<img src='" + questionObj.displayImg + "' alt='description' />");
   };
   function feedbackText(var1, var2, var3, var4, var5){
      $('.game #feedback1').text(var1);
      $('.game #answer-count').text(var2);
      $('.game #total-questions').text(var3);
      $('.game #correct-count').text(var4);
      $('.game #incorrect-count').text(var5);
      var accuracy = 'Your accuracy is ' + ((var2 == 0)?'N/A':(Math.round(var4*100/var2) + '%'));
      $('.accuracy').text(accuracy);
   };
   function newQuiz(){ //start or restart the quiz.
      //console.log('Loaded newQuiz');
      correctCount = 0;
      answerCount = 0;
      $('.game form')[0].reset();
      randomQuestions = getRandomArr(quizDatabase,totalQuestions);
      Quiz = Object.create(randomQuestions[answerCount]);//Per challenge requirement
      console.log(Quiz);
      loadQuestion(randomQuestions[answerCount]);
      feedbackText(
         'Welcome to the quiz. Good luck!',
         answerCount,
         totalQuestions,
         correctCount,
         answerCount - correctCount
      );
   }


   $(".what").click(function(){
    	$(".introduction").fadeIn(1000);
  	});
   /*--- Hide information modal box ---*/
   $(".introduction a.close").click(function(){
      // event.preventDefault();
  		$(".introduction").fadeOut(1000);
      if(answerCount === 0){
         // console.log('start the new game from intro');
         newQuiz();
      };
  	});
   $(".conclusion a.close").click(function(){
      // event.preventDefault();
  		$(".conclusion").fadeOut(1000);
      newQuiz();
  	});
   $(".new").click(function(){
      newQuiz();
   });

   $(".game form").submit(function(){
      event.preventDefault();
      var theAnswer = [];
      var correctAnswer = randomQuestions[answerCount].correctChoice;
      // console.log(correctAnswer);
      var previousRes = '';
      $('.game input:checked').each(function(){
         theAnswer.push(this.value);
      });
      // console.log(theAnswer);
      if (theAnswer.length > 0){
         if (theAnswer.toString() === correctAnswer.toString()){
            // console.log('correct');
            correctCount ++;
            previousRes = 'Great job! The previous answer was correct. ';
         }else{
            // console.log('wrong');
            previousRes =
            'The previous answer was incorrect; the correct answer was ' +
            correctAnswer +
            '. ';
         }
         alert(previousRes + randomQuestions[answerCount].explaination);
         answerCount ++;
         if (answerCount === totalQuestions){
             alert('you finished the quiz');
             $(".conclusion").fadeIn(1000);
         }
         feedbackText(
            previousRes,
            answerCount,
            totalQuestions,
            correctCount,
            answerCount - correctCount
         );
         if (answerCount < totalQuestions){
            loadQuestion(randomQuestions[answerCount]);
         }
         $('.game form')[0].reset();
      }else{
         alert('You have to choose something even if you don\'t the answer. ')
      }

   })
});
