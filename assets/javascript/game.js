  
console.log("hello!");


var answerPool = ["binturong","platypus","wombat"];
var imagePool = ["binturong.jpg","Platypus.jpg", "Wombat.jpg"];
var hintPool = ["Lives in SE Asia", "Duck Beaver", "Australia Mate"];

var Question = function(imageUrl,hintText,answer){
this.imageURL = imageUrl;
this.hintText = hintText;
this.answer = answer;
this.masked_answer = getMaskedAnswer(answer);
};

var correctGuessArray = [];
var incorrectGuessArray = [];
var playGame = false;
var questionPool = [];

var win = false;
var numRemainingGuesses = 3;
var currentQuestion;


var mainContentRow = document.getElementById("main-game-area");
var playQuitButton = document.getElementById("play-now");
var hintImage = document.getElementById("hint-image");



function getMaskedAnswer(answerToConvert){
	var masked_answer = []; 
	for(var q = 0; q < answerToConvert.length;q++){
		
		masked_answer.push("_");
	}

	return masked_answer;

}
function getQuestionPool(answerPool){
	var questionPool = [];
	for(var i = 0; i < answerPool.length; i++){		
		questionPool.push(new Question(imagePool[i],hintPool[i],answerPool[i]));
		}
		console.log(questionPool);

		return questionPool;
}

function gameStart(){
		playGame = true;
		console.log("play game!");			
		mainContentRow.style.visibility = "visible";
		playQuitButton.style.visibility = "hidden";
		questionPool = getQuestionPool(answerPool);
		currentQuestion = nextQuestion();
}

//Prep the first round or start the next round
//Reset or Set Guesses
//Clear correctGuessArray
//Clear incorrrectGuessArray
//Set next question
//Add next question to previousQuestions
//
function nextQuestion(){
	if(questionPool.length === 0){
		console.log("regen pool");
		questionPool = getQuestionPool(answerPool);
	}

	numRemainingGuesses = 3;
	correctGuessArray = [];
	incorrectGuessArray = [];
	var currentQuestion = questionPool[Math.floor(Math.random()*questionPool.length)];
	questionPool.splice(questionPool.indexOf(currentQuestion),1);
	console.log("QUESTIONS LENGTH IN NEXT QUESTION: " + questionPool.length);
	
	return currentQuestion;
}

//Actually do stuff
document.onkeypress = function(){

if(playGame){

var selection = String(event.key).toLowerCase();

//console.log("User Chose: " + selection);

  if(currentQuestion.answer.includes(selection) && correctGuessArray.indexOf(selection) === -1 && incorrectGuessArray.indexOf(selection) === -1){
  	//sorry Oleg ;)
	for(var k = 0; k < currentQuestion.answer.length; k++){
		currentQuestion.masked_answer[(currentQuestion.answer.indexOf(selection, k))] = selection;
	 }

	correctGuessArray.push(selection);	
	console.log("FOUND: " + selection + " in word: " + currentQuestion.answer);
 	console.log("Masked answer: " + currentQuestion.masked_answer);

 	if(currentQuestion.masked_answer.join("") === currentQuestion.answer){

 		console.log("YOU WIN!");
 		currentQuestion = nextQuestion();
 	}

 }
 else if(correctGuessArray.indexOf(selection) >= 0 || incorrectGuessArray.indexOf(selection) >=0){
 	console.log("DUPE GUESS: " + selection);
 }

else
 {
 	incorrectGuessArray.push(selection);
 	console.log("NOT FOUND: " + selection);
 	numRemainingGuesses--;
 	if(numRemainingGuesses < 1){
 		console.log("YOU LOSE!");
 		console.log("The answer was: " + currentQuestion.answer);
 		currentQuestion = nextQuestion();
 	}
 }
}
}






























