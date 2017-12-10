  
console.log("hello!");




var answerPool = ["binturong","platypus","wombat"];
var imagePool = ["binturong.jpg","platypus.jpg", "wombat.jpg"];
var hintPool = ["Lives in SE Asia", "Duck Beaver", "Australia Mate"];

var Question = function(imageUrl,hintText,answer){
this.imageURL = imageUrl;
this.hintText = hintText;
this.answer = answer;
this.maskedAnswer = getMaskedAnswer(answer);
};

var correctGuessArray = [];
var incorrectGuessArray = [];
var playGame = false;
var questionPool = [];
var winCount = 0;
var loseCount = 0 ;
var numRemainingGuesses = 3;
var currentQuestion;

//only need the first element for this 
var mainContentRow = document.getElementsByClassName("main-row")[0];
var playQuitButton = document.getElementsByClassName("play-button")[0];
var scoreRow = document.getElementsByClassName("score-row")[0];
var currentWinCountElement = document.getElementsByClassName("win-count")[0];
var currentLoseCountElement = document.getElementsByClassName("lose-count")[0];
var currentHintImage = document.getElementsByClassName("hint-image")[0];
var currentHintText = document.getElementsByClassName("hint-text")[0];
var currentMaskedText = document.getElementsByClassName("masked-text")[0];

//"converts" our answer's length into an array of underscores for guessing
function getMaskedAnswer(answerToConvert){
	var maskedAnswer = []; 
	for(var q = 0; q < answerToConvert.length;q++){
		
		maskedAnswer.push("_");
	}

	return maskedAnswer;

}
//creates our "questions" by pulling from three pools
//bummer is that the pools indexes need to be related i.e. index 0 should all relate to the same question
function getQuestionPool(answerPool, imagePool, hintPool){
	var questionPool = [];
	for(var i = 0; i < answerPool.length; i++){		
		questionPool.push(new Question(imagePool[i],hintPool[i],answerPool[i]));
		}
		console.log(questionPool);

		return questionPool;
}


//Called when user presses "Play Game" button on page
function gameStart(){
		playGame = true;
		console.log("play game!");	

		mainContentRow.style.visibility = "visible";
		scoreRow.style.visibility = "visible";
		playQuitButton.style.visibility = "hidden";

		questionPool = getQuestionPool(answerPool, imagePool, hintPool);
		currentQuestion = nextQuestion();
}

//Sets the HTML elements to display Question data
function displayQuestionHtml(imageURL,hintText,maskedAnswer){
	currentHintImage.src = "./assets/images/" + imageURL;
	currentHintText.textContent = hintText;	
	updateMaskedAnswerElement(maskedAnswer);
}

//used to update maskedAnswer that displays on page whenever the selection is correct
function updateMaskedAnswerElement(maskedAnswer){
	
	currentMaskedText.textContent = maskedAnswer;
}

//After the questionPool is empty (after a full round), regenerate the pool with randomly ordered questions
//Choose the next currentQuestion and remove it from the questionPool
//If it is the first game of the session, simply select a question from the pool and display related data and remove from pool

function nextQuestion(currentQuestion){

	if(questionPool.length < 1){

		console.log("Regenerate questionPool");
		questionPool = getQuestionPool(answerPool, imagePool, hintPool);
		currentQuestion = questionPool[Math.floor(Math.random()*questionPool.length)];

	}
	//This is used only for gameStart at the first game of the session
	else
	{

		currentQuestion = questionPool[Math.floor(Math.random()*questionPool.length)];
		
	}

	numRemainingGuesses = 3;
	correctGuessArray = [];
	incorrectGuessArray = [];
	displayQuestionHtml(currentQuestion.imageURL,currentQuestion.hintText,currentQuestion.maskedAnswer);
	
	//remove current question from Pool to prevent dupes within the round
	questionPool.splice(questionPool.indexOf(currentQuestion),1); 

	return currentQuestion;
}

function updateWinElement(winCount){
	currentWinCountElement.textContent =  "WINS: " + String(winCount);

}
function updateLoseElement(loseCount){

	currentLoseCountElement.textContent = "LOSSES: " + String(loseCount);

}
//Actually do stuff
//Need to organize this stuff because it's super messy...
document.onkeypress = function(){

if(playGame){

var selection = String(event.key).toLowerCase();

  if(currentQuestion.answer.includes(selection) && !correctGuessArray.includes(selection) && !incorrectGuessArray.includes(selection)){

	for(var k = 0; k < currentQuestion.answer.length; k++){

		if(currentQuestion.answer[k] === selection){

			currentQuestion.maskedAnswer[k] = selection;

		}
		
	 }
	console.log("FOUND: " + selection + " in word: " + currentQuestion.answer);
 	console.log("Masked answer: " + currentQuestion.maskedAnswer);
	correctGuessArray.push(selection);	
	//Check if we won
 	if(currentQuestion.maskedAnswer.join("") === currentQuestion.answer){

 		console.log("YOU WIN!");
 		
 		
 		updateWinElement(++winCount);
 		currentQuestion = nextQuestion(currentQuestion);
 	}
 		
 		updateMaskedAnswerElement(currentQuestion.maskedAnswer);
 }
 
 
else if(!currentQuestion.answer.includes(selection) && !correctGuessArray.includes(selection) && !incorrectGuessArray.includes(selection))
 {
 	incorrectGuessArray.push(selection);
 	console.log("NOT FOUND: " + selection);
 	numRemainingGuesses--;
 	if(numRemainingGuesses < 1){
 		console.log("YOU LOSE!");
 		console.log("The answer was: " + currentQuestion.answer);
 		
 		updateLoseElement(++loseCount);
 		currentQuestion = nextQuestion(currentQuestion);
 	}
 }
 else if(correctGuessArray.includes(selection) || incorrectGuessArray.includes(selection)){
 	console.log("DUPE GUESS: " + selection);
 }
 else{
 	console.log("SOMETHING WENT WRONG...");
 }
}
}