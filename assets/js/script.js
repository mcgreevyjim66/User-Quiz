// declare element objects on html for processing
var timerElement = document.querySelector("#timer-span");
var resultBarElement = document.querySelector("#result-bar");
var startButton = document.querySelector(".start-button");
var resetButton = document.querySelector(".reset-button");

var questiontext = document.querySelector("#question-text");
var answer1BtnObj = document.querySelector("#answerBtn1");
var answer2BtnObj = document.querySelector("#answerBtn2");
var answer3BtnObj = document.querySelector("#answerBtn3");
var answer4BtnObj = document.querySelector("#answerBtn4");

var resultsForm = document.querySelector("#results-form");
var resultsList = document.querySelector("#results-list");
var resultsCountSpan = document.querySelector("#results-count");



  // Get the dialog element
  const resultsDialog = document.getElementById("resultsDialog");

  // Get the open dialog button
  const openDialogBtn = document.getElementById("openDialogBtn");
  
  // Get the close dialog button
  const closeDialogBtn = document.getElementById("closeDialogBtn");
  
  // Get the apply criteria button
  const applyDialogBtn = document.getElementById("applyDialogBtn");

  // Get generateForm element
  const myForm = document.getElementById("generateForm");

  var userinitials = document.getElementById("userinitials");

//declare global variables used in processing

var timer;
var timerCount;
var currentquestionnumber = 0;
var totalscore = 0;
var userinitials = ""


// define quiz object
const quizQuestion1obj = {
  question: "Who was first president of United States?",
  answer1: "George Washington",
  answer2: "Benjamin Franklin",
  answer3: "Thomas Jefferson",
  answer4: "John Adams",
  correctAnswer: "George Washington",
  gotCorrect: false,
};
const quizQuestion2obj = {
  question: "What is the average land speed of a Cheeta?",
  answer1: "50 mph",
  answer2: "60 mph",
  answer3: "65 mph",
  answer4: "70 mph",
  correctAnswer: "65 mph",
  gotCorrect: false,
};
const quizQuestion3obj = {
  question: "How many planets are there in the solar system?",
  answer1: "7",
  answer2: "8",
  answer3: "9",
  answer4: "10",
  correctAnswer: "8",
  gotCorrect: false,
};
const quizQuestion4obj = {
  question: "What is the largest mammal on Earth?",
  answer1: "Hippo",
  answer2: "Elephant",
  answer3: "Giraffe",
  answer4: "Blue Whale",
  correctAnswer: "Blue Whale",
  gotCorrect: false,
};
const quizQuestion5obj = {
  question: "What is the acceleration of gravity?",
  answer1: "10 m/s",
  answer2: "7 ms",
  answer3: "9.8 m/s",
  answer4: "5 m/s",
  correctAnswer: "9.8 m/s",
  gotCorrect: false,
};
// array of question objects
var ArrayofQuestions = [quizQuestion1obj, quizQuestion2obj, quizQuestion3obj, quizQuestion4obj, quizQuestion5obj];
var numQuestions = ArrayofQuestions.length;

//declare score object $ array
var ScoreObj = {
  initials: "",
  quizscore: 0,
};
var ArrayofScores =[];



// The init function is called when the page loads 
function init() {

    // Get stored todos from localStorage
    var storedscores = JSON.parse(localStorage.getItem("arrayofscores"));
   // If were retrieved from localStorage, update the todos array to it
  if (storedscores !== null) {
    ArrayofScores = storedscores;
  } else {
    ArrayofScores =[];
  }
  renderScores();

  startButton.disabled = false;
  startButton.style.display = "inline";
  resetButton.disabled = false;
  isDone = true;
  currentquestionnumber = 0;
  timerCount = 50;

  timerElement.textContent = timerCount;
  questiontext.textContent = "Press Start button to begin new quiz."
  //answer1BtnObj.textContent = "";
  //answer2BtnObj.textContent = "Answer # 2";
  //answer3BtnObj.textContent = "Answer # 3";
  //answer4BtnObj.textContent = "Answer # 4";
 
  answer1BtnObj.style.display = "none";
  answer2BtnObj.style.display = "none";
  answer3BtnObj.style.display = "none";
  answer4BtnObj.style.display = "none";

  resultBarElement.textContent = "";

  }
// store latest score in local storage
  function StoreScore() {
    // Stringify and set key in localStorage scores array
    ScoreObj.initials = userinitials.value;
    ScoreObj.quizscore = totalscore;
    ArrayofScores.push(ScoreObj);
    localStorage.setItem("arrayofscores", JSON.stringify(ArrayofScores));
  }
// start a new quiz
  function startQuiz(){
    var numQuestions = ArrayofQuestions.length;
    currentquestionnumber = 0;
    isDone = false;
    timerCount = 50;
    // Prevents start button from being clicked when round is in progress
    startButton.disabled = true;
    resetButton.disabled = true;
    startButton.style.display = "none";
    answer1BtnObj.style.display = "inline"; 
    answer2BtnObj.style.display = "inline"; 
    answer3BtnObj.style.display = "inline"; 
    answer4BtnObj.style.display = "inline"; 

      startTimer();
      displayQuestion();
      listenforAnswer();

  }
  //stop current running quiz
  function stopQuiz(){

    answer1BtnObj.removeEventListener("click", answer1Clicked);
    answer2BtnObj.removeEventListener("click", answer2Clicked);
    answer3BtnObj.removeEventListener("click", answer3Clicked);
    answer4BtnObj.removeEventListener("click", answer4Clicked);

    CalculateScore();

    //StoreScore();
    openDialog();

    startButton.disabled = false;
    startButton.style.display = "inline";
    resetButton.disabled = false;
    isDone = true;

    questiontext.textContent = "Press Start button to begin new quiz."
  
    answer1BtnObj.style.display = "none";
    answer2BtnObj.style.display = "none";
    answer3BtnObj.style.display = "none";
    answer4BtnObj.style.display = "none";
    resultBarElement.textContent = "";
     

  }
  //reset quiz scores
  function resetQuiz(){
    localStorage.clear();
    init();
    startButton.disabled = false;
    resetButton.disabled = false;
    isDone = true;
 
  }
  //calculate score of last quiz
  function CalculateScore(){
    totalscore =0;
    for (i=0; (i + 1) <=ArrayofQuestions.length; i++)
    { 
      if (ArrayofQuestions[i].gotCorrect)
          totalscore++;
    }
  }
  //continue with next question in quiz
  function continueQuiz(){

    currentquestionnumber++;


      displayQuestion();
      listenforAnswer();

  }

  
// display the current question on the page
function displayQuestion(){
  currentQuestion = ArrayofQuestions[currentquestionnumber];
  questiontext.textContent = currentQuestion.question;
  answer1BtnObj.textContent = currentQuestion.answer1;
  answer2BtnObj.textContent = currentQuestion.answer2;
  answer3BtnObj.textContent = currentQuestion.answer3;
  answer4BtnObj.textContent = currentQuestion.answer4;
}
//start event listeners for quiz answer buttons
function listenforAnswer(){
  var answerClicked = false;
  answer1BtnObj.addEventListener("click", answer1Clicked);
  answer2BtnObj.addEventListener("click", answer2Clicked);
  answer3BtnObj.addEventListener("click", answer3Clicked);
  answer4BtnObj.addEventListener("click", answer4Clicked);

}

//proces quiz answer buttons
function answer1Clicked(){

if (currentQuestion.correctAnswer == currentQuestion.answer1){
  ArrayofQuestions[currentquestionnumber].gotCorrect = true;
  resultBarElement.textContent = "Answer Correct!";

} else {
  ArrayofQuestions[currentquestionnumber].gotCorrect = false;
  resultBarElement.textContent = "Answer Incorrect! 15 seconds deducted from Timer!";
  timerCount = timerCount - 15;
  if (timerCount <= 0){timerCount = 1} 
}

if ((currentquestionnumber + 1) == ArrayofQuestions.length) {
    stopQuiz()
  } else {
    continueQuiz();
  }

}
function answer2Clicked(){

  if (currentQuestion.correctAnswer == currentQuestion.answer2){
    ArrayofQuestions[currentquestionnumber].gotCorrect = true;
    resultBarElement.textContent = "Answer Correct!";
  } else {
    ArrayofQuestions[currentquestionnumber].gotCorrect = false;
    resultBarElement.textContent = "Answer Incorrect! 15 seconds deducted from Timer!";
    timerCount = timerCount - 15;
    if (timerCount <= 0){timerCount = 1} 
  }
  
  if ((currentquestionnumber + 1) == ArrayofQuestions.length) {
      stopQuiz()
    } else {
      continueQuiz();
    }
  
  }
 
  function answer3Clicked(){

    if (currentQuestion.correctAnswer == currentQuestion.answer3){
      ArrayofQuestions[currentquestionnumber].gotCorrect = true;
      resultBarElement.textContent = "Answer Correct!";
    } else {
      ArrayofQuestions[currentquestionnumber].gotCorrect = false;
      resultBarElement.textContent = "Answer Incorrect! 15 seconds deducted from Timer!";
      timerCount = timerCount - 15;
      if (timerCount <= 0){timerCount = 1} 
    }
    
    if ((currentquestionnumber + 1) == ArrayofQuestions.length) {
        stopQuiz()
      } else {
        continueQuiz();
      }
    
    }
 
    function answer4Clicked(){

      if (currentQuestion.correctAnswer == currentQuestion.answer4){
        ArrayofQuestions[currentquestionnumber].gotCorrect = true;
        resultBarElement.textContent = "Answer Correct!";
      
      } else {
        ArrayofQuestions[currentquestionnumber].gotCorrect = false;
        resultBarElement.textContent = "Answer Incorrect! 15 seconds deducted from Timer!";
        timerCount = timerCount - 15;
        if (timerCount <= 0){timerCount = 1} 
      }
      
      if ((currentquestionnumber + 1) == ArrayofQuestions.length) {
          stopQuiz()
        } else {
          continueQuiz();
        }
      
      }



// code for score saving dialog processing


        // Function to open the dialog
        function openDialog() {
          resultsDialog.showModal();
        }


        // Function to close the dialog
        function closeDialog() {
          
          myForm.reset();
          resultsDialog.close();
          init();
        
        }

        function applyDialog() {
       
            // Get initials from dialog
            userinitials = document.getElementById("userinitials");
            //console.log("user initials " + userinitials.value)
        
          if (userinitials.value.length > 0)
          {
              StoreScore();
         
          } else {
                  window.alert("You did not enter any user initials.");
                  return; 
                 }
        
                // Close the dialog
          closeDialog();
          renderScores();
        }
         
        
        
// end code for dialog processing

// code for past scores processing

// The following function renders items in a todo list as <li> elements
function renderScores() {
  // Clear past scores results lsit
  resultsList.innerHTML = "";
  
  // Render a new li for each score
  for (var i = 0; i < ArrayofScores.length; i++) {
    var initresult = ArrayofScores[i].initials;
    var quizresult = ArrayofScores[i].quizscore;

    var li = document.createElement("li");
    li.textContent = "User: " + initresult + " Scored: " + quizresult;
    li.setAttribute("data-index", i);


    resultsList.appendChild(li);
  }
}



// end code scors processing



// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if isdone condition is met
      if (isDone && timerCount > 0) {
        // Clears interval and stops timer
          clearInterval(timer);
          stopQuiz();
      }
    }
    // Tests if time has run out
    if (timerCount <= 0) {
      // Clears interval
       clearInterval(timer);
       timerCount = 0;
      stopQuiz();
    }
  }, 1000);
}


// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startQuiz);

resetButton.addEventListener("click", resetQuiz);

// Event listeners
closeDialogBtn.addEventListener("click", closeDialog);
applyDialogBtn.addEventListener("click", applyDialog);

// Calls init() so that it fires when page opened
init();


