$( document ).ready(function() {
   
console.log("hello!");


var masked_array = [];
var answer_pool = ["Binturong","Platypus","Wombat"];
var playGame = false;
var playQuitButton = $(".play-button");
var questions = [];

var Question = {imageURL:"", hintText:"", answer:""};




function play(){
	if(playGame){
		console.log("play game!");		
		$(playQuitButton).text("Quit Playing!");
		$(".main-row").css("visibility","visible");	
	}
	else
	{
		$(playQuitButton).text("Play Game!");
		$(".main-row").css("visibility","hidden");
		console.log("quitting!");
	}
}

$(playQuitButton).on("click",function(){
	if(playGame){
		playGame = false;
		play();
	}
	else{	
		playGame = true;
		play();
	}
});


























});



