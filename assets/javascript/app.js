var triviaQuestions = [{
	question: "In what city was the rock band BUSH formed?",
	answerList: ["Seattle", "London", "Los Angeles", "New York"],
	answer: 1
},{
	question: "In what city did the grunge band NIRVANA record thier album \"Nevermind\"?",
	answerList: ["Los Angeles", "Seattle", "Aberdeen", "Tacoma"],
	answer: 0
},{
	question: "Who played drums for the band SOUNDGARDEN in 1984?",
	answerList: ["Matt Cameron", "Ben Shepherd", "Kim Thayil", "Hiro Yamamoto"],
	answer: 0
},{
	question: "The Long Beach ska band SUBLIME formed in what year?",
	answerList: ["1990", "1986", "1988", "1993"],
	answer: 2
},{
	question: "In what year did the band GREEN DAY win the Grammy for thier album \"Dookie\"?",
	answerList: ["1992", "1998", "1990", "1994"],
	answer: 3
},{
	question: "How many albums has the English rock band OASIS released?",
	answerList: ["13", "29", "10", "6"],
	answer: 0
},{
	question: "What city is the lead singer of PEARL JAM from?",
	answerList: ["Seattle", "San Diego", "Los Angeles", "Saramento"],
	answer: 1
},{
	question: "Where did Billy Corgan work before forming SMASHING PUMPKINS?",
	answerList: ["Gas Station", "Record Store", "Night Club", "Car Dealership"],
	answer: 1
},{
	question: "What was the name of the rock band WEEZER's first single",
	answerList: ["Say It Ain\'t So", "Buddy Holly", "Undone - The Sweater Song", "Hash Pipe"],
	answer: 2
},{
	question: "The guitarist Dave Navarro from JANE'S ADDICTION was married to what 90's sex symbol?",
	answerList: ["Pamela Anderson", "Heather Locklear", "Claudia Schiffer", "Carmen Electra"],
	answer: 3
},{
	question: "What was the name of the punk band BLINK 182's debut album?",
	answerList: ["Enema of the State", "Cheshire Cat", "Take Off Your Pants and Jacket", "Dude Ranch"],
	answer: 1
},{
	question: "Zack de la Rocha is the lead singer for which Los Angeles based band?",
	answerList: ["AUDIOSLAVE", "RAGE AGAINST THE MACHINE", "THE VERVE", "COLLECTIVE SOUL"],
	answer: 1
},{
	question: "Gwen Stefani of the ska band NO DOUBT wrote the song \"Don't Speak\" for this musician.",
	answerList: ["Blake Shelton", "Gavin Rossdale", "Brad Nowell", "Tony Kanal"],
	answer: 3
},{
	question: "The rock band EVERCLEAR was formed in 1992 in which state?",
	answerList: ["Oregon", "California", "Washington", "Arizona"],
	answer: 0
},{
	question: "Scottish born Shirley Manson is the lead singer of what band?",
	answerList: ["Hole", "Sonic Youth", "Garbage", "Pixies"],
	answer: 2
}];

var pngArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "NICE, you got it!",
	incorrect: "NOPE, that's not it.",
	endTime: "TIME'S UP! Too slow.",
	finished: "Okay! Let's see how you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#directions').empty();
	$('#correctedAnswer').empty();
	$('#png').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+' out of '+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + ' seconds</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + ' seconds</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#directions').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#png').html('<img src = "assets/images/'+ pngArray[currentQuestion] +'.png" width = "500px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#directions').empty();
	$('#currentQuestion').empty();
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#png').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('clear');
	$('#startOverBtn').show();
	$('#startOverBtn').html('<img src = "assets/images/startover_img-01.svg") no-repeat>');
}
