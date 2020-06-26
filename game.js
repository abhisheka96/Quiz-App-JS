const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
	{
		question : "Inside which HTML element do we put the JavaScript ?",
		choice1 : "<script>",
		choice2 : "<javascript>",
		choice3 : "<js>",
		choice4 : "<scripting>",
		answer :  1
	},

	{
		question : "What is the correct syntax for referring to an external script called 'xyz.js' ?",
		choice1 : "<script href='xyz.js'>",
		choice2 : "<script name='xyz.js'>",
		choice3 : "<script src='xyz.js'>",
		choice4 : "<script file='xyz.js'>",
		answer :  3
	},

	{
		question : "How do you write 'Hello World' in an alert box?",
		choice1 : "msgBox('Hello World');",
		choice2 : "alertBox('Hello World');",
		choice3 : "msg('Hello World');",
		choice4 : "alert('Hello World');",
		answer :  4
	}
];

//constants

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];	//spread operator
	getNewQuestion();
};

getNewQuestion = () => {
	if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
		// go to the end page
		return window.location.assign("/end.html");
	}
	questionCounter++;			//increments the question count
	const questionIndex = Math.floor(Math.random() * availableQuestions.length);   //this function used to randomise the set of question so
																				//each time a random question pops instead of the natural
																				//order of questions.
	currentQuestion = availableQuestions[questionIndex]; 		//the question index is fed to the current question variable
	question.innerText = currentQuestion.question;				//the question from the current question will be displayed as inner text.

	choices.forEach( choice => {
		const number = choice.dataset["number"];   				//to access number properties
		choice.innerText = currentQuestion["choice" + number];
	});

	availableQuestions.splice(questionIndex, 1); //we used the splice method here to focus on the fact that when we answer a particular
												//question and then proceed to the next question the questionIndex will be randomised
												//and we dont want the same question again soo this will give us another question instead.
	acceptingAnswers = true;
};

	choices.forEach(choice => {					//here we want to grab each choice so we use an event listener and when we click the event
		choice.addEventListener("click", e => { //will act as an argument
			if(!acceptingAnswers) return;
			acceptingAnswers = false;
			const selectedChoice = e.target;
			const selectedAnswer = selectedChoice.dataset["number"];

			const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
			
			setTimeout(() => {
      		selectedChoice.parentElement.classList.remove(classToApply);
      		getNewQuestion();
    		}, 1000);
			
		});										
	});


startGame();

