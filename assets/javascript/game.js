  
console.log("hello!");


var answerPool = ["binturong","platypus","wombat"];
var imagePool = ["./assets/images/binturong.jpg","./assets/images/platypus.jpg", "./assets/images/wombat.jpg"];
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


var mainContentRow = document.getElementsByClassName("main-row")[0];
var playQuitButton = document.getElementsByClassName("play-button")[0];
var currentHintImage = document.getElementsByClassName("hint-image")[0];
var currentHintText = document.getElementsByClassName("hint-text")[0];
var currentMaskedText = document.getElementsByClassName("masked-text")[0];

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
//Called when user presses "Play Game" button on page
function gameStart(){
		playGame = true;
		console.log("play game!");			
		mainContentRow.style.visibility = "visible";
		playQuitButton.style.visibility = "hidden";
		questionPool = getQuestionPool(answerPool);
		currentQuestion = nextQuestion();
}


function nextQuestion(){

	if(questionPool.length < 1){
		console.log("regen pool");
		questionPool = getQuestionPool(answerPool);
	}

	numRemainingGuesses = 3; //3 guesses for quick testing
	correctGuessArray = [];
	incorrectGuessArray = [];
	var currentQuestion = questionPool[Math.floor(Math.random()*questionPool.length)];
	questionPool.splice(questionPool.indexOf(currentQuestion),1); //remove the current question from the question pool to prevent dupes
	console.log("QUESTIONS LENGTH IN NEXT QUESTION: " + questionPool.length);

	currentHintText.textContent = currentQuestion.hintText;
	currentHintImage.src = currentQuestion.imageURL;
	currentMaskedText.textContent = currentQuestion.masked_answer;

	return currentQuestion;
}

//Actually do stuff
document.onkeypress = function(){

if(playGame){

var selection = String(event.key).toLowerCase();




  if(currentQuestion.answer.includes(selection) && !correctGuessArray.includes(selection) && !incorrectGuessArray.includes(selection)){

	for(var k = 0; k < currentQuestion.answer.length; k++){

		if(currentQuestion.answer[k] === selection){

			currentQuestion.masked_answer[k] = selection;

		}
		//LOL below was unnecessary but sure looks nice. This for loop does the same.
		//Unnecssary because we're already looping through for every element. Don't know which would be faster, but for loop easier to read
			//currentQuestion.masked_answer[(currentQuestion.answer.indexOf(selection, k))] = selection; 
				//Finds the next instance of selection by using the iterator k as an index offset which is inclusive of index[k]
				//Replaces underscores within masked_array by finding the location of selection within currentQuestion.answer string 	
	 }

	correctGuessArray.push(selection);	
	console.log("FOUND: " + selection + " in word: " + currentQuestion.answer);
 	console.log("Masked answer: " + currentQuestion.masked_answer);

 	if(currentQuestion.masked_answer.join("") === currentQuestion.answer){

 		console.log("YOU WIN!");
 		currentQuestion = nextQuestion();
 	}
 		currentMaskedText.textContent = currentQuestion.masked_answer;
 }
 else if(correctGuessArray.includes(selection) || incorrectGuessArray.includes(selection)){
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






























