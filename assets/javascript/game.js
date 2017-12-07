  
console.log("hello!");


var answerPool = ["binturong","platypus","wombat"];
var imagePool = ["binturong.jpg","Platypus.jpg", "Wombat.jpg"];
var hintPool = ["Lives in SE Asia", "Duck Beaver", "Australia Mate"];

var correctGuessArray = [];
var incorrectGuessArray = [];
var playGame = false;
var questions = [];
var win = false;
var numRemainingGuesses = 3;
var currentQuestion;
var previousQuestions = [];


var mainContentRow = document.getElementById("main-game-area");
var playQuitButton = document.getElementById("play-now");
var hintImage = document.getElementById("hint-image");
var Question = function(imageUrl,hintText,answer){
this.imageURL = imageUrl;
this.hintText = hintText;
this.answer = answer;
this.masked_answer = getMaskedAnswer(answer);
};


function getMaskedAnswer(answerToConvert){

	var masked_answer = []; 
	for(var q = 0; q < answerToConvert.length;q++){
		
		masked_answer.push("_");
	}

	return masked_answer;

}
function initializeQuestionArray(){
	for(var i = 0; i < answerPool.length; i++){		
		questions.push(new Question(imagePool[i],hintPool[i],answerPool[i]));

		}

		console.log(questions);	
}

function gameStart(){
	if(playGame){
		console.log("play game!");			
		mainContentRow.style.visibility = "visible";
		playQuitButton.style.visibility = "hidden";
		initializeQuestionArray();
		nextQuestion();
	}
	
}

function nextQuestion(){

	
	correctGuessArray = [];
	incorrectGuessArray = [];
	currentQuestion = questions[Math.floor(Math.random()*questions.length)];
	numRemainingGuesses = 3;
}

function setPlayGame(){
	if(playGame){
		playGame = false;
		
	}
	else{	
		playGame = true;
		gameStart();
		
		

	}
};

//Main stuff
//javascript is ugly







//console.log("User Chose: " + selection);


	


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
 		nextQuestion();
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
 		nextQuestion();

 	}
 }


 




}
}






























