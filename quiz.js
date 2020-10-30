const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const reviewButton = document.getElementById('review-button');
const backButton = document.getElementById('back');
const reviewContainer = document.getElementById('review');
const reviewView =document.getElementById('reviewView');
const quizView = document.getElementById('quizView');
const restartButton = document.getElementById('retake');
const resultsView = document.getElementById('resultsView');
const myQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich"
      },
      correctAnswer: "c"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm"
      },
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    },
    {
        question: "Who co-created the UNIX operating system in 1969 with Dennis Ritchie?",
        answers:{
            a: "Niklaus Wirth",
            b: "Ken Thompson",
            c: "Bjarne Stroustrup",
            d: "Steve Wozniak",
        },
        correctAnswer: "b"
    },
    {
        question: "Who designed the original Java language and wrote Emacs for Unix systems?",
        answers:{
            a: "Ramus Lerdorf",
            b: "Larry Ellison",
            c: "Larry Wall",
            d: "James Gosling",
        },
        correctAnswer: "d"
    },
    {
        question: "Who is considered to be the world's first programmer (1843)? A software language was named in this person's honor.",
        answers:{
            a: "Konrad Zuse",
            b: "Alan Turing",
            c: "George Boole",
            d: "Ada Byron Lovelace",
        },
        correctAnswer: "d"
    },
    {
        question: "Who is largely responsible for breaking the German Enigma codes, created a test that provided a foundation for artificial intelligence?",
        answers:{
            a: "Charles Babbage",
            b: "Alan Turing",
            c: "Jeff Bezos",
            d: "George Boole",
        },
        correctAnswer: ""
    },
  ];

function buildQuiz(){
    const output = [];
    reviewView.style.display="none";
    resultsView.style.display="none";
    output.push(`<h3>Quiz</h3>`)
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
        const answers = [];
        for(letter in currentQuestion.answers){

            answers.push(
                `<label style="display:block;">
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${currentQuestion.answers[letter]} &nbsp&nbsp 
                </label>`
            );
        }
        output.push(
            `<div class="question" style="font-weight:bold;font-size:large;"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
        }
    );
    quizContainer.innerHTML = output.join('');
}

function showReview(){

    quizView.style.display="none";
    reviewView.style.display="block";
    resultsView.style.display="none";
    const answerContainers = quizContainer.querySelectorAll('.answers');
    const output=[];
    output.push(`<h4> Review your answers </h4>`)
    
    myQuestions.forEach( (currentQuestion, questionNumber) => {
    
      const reviews=[];
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      console.log("anser isthis "+userAnswer);
      for(letter in currentQuestion.answers){
        
        if(letter===userAnswer){
            reviews.push(
                `<label>
                <input type="radio" name="questionR${questionNumber}" value="${letter}" checked>
                ${currentQuestion.answers[letter]} &nbsp&nbsp
                </label>`
            );}
        else{
            reviews.push(
                `<label style="color:#e0dfdc;">
                <input type="radio" disabled="true" name="questionR${questionNumber}" value="${letter}" >
                ${currentQuestion.answers[letter]} &nbsp&nbsp
                </label>`
            );  
        }
    }
    output.push(
        `<div class="questioR"> ${currentQuestion.question} </div>
        <div class="answersR"> ${reviews.join('')} </div>`
      );
      
      
    }
    
    );
    reviewContainer.innerHTML=output.join('');
}
  


function showResults(){

    quizView.style.display="block";
    reviewView.style.display="none";
    resultsView.style.display="block";
    reviewButton.style.display="none";
    const answerContainers = quizContainer.querySelectorAll('.answers');
  
    let numCorrect = 0;
  
    myQuestions.forEach( (currentQuestion, questionNumber) => {
  
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
      if(userAnswer === currentQuestion.correctAnswer){
        numCorrect++;
  
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      else{
        answerContainers[questionNumber].style.color = 'red';
        console.log(answerContainer[questionNumber]);
      }
    });
  
    resultsContainer.innerHTML = `<h4> Your score is ${numCorrect} out of ${myQuestions.length} </h4>`;
  }

function goBack(){
    quizView.style.display="block";
    reviewView.style.display="none";
    resul
  }

function retake(){
    window.location.reload();
  }


buildQuiz();

reviewButton.addEventListener('click', showReview);
backButton.addEventListener('click', goBack);
submitButton.addEventListener('click',showResults);
restartButton.addEventListener('click',retake);

