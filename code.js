// To run this assignment, right click on index.html in the Visual Studio Code file explorer to the left
// and select "Open with Live Server"

// YOUR CODE HERE!
class Trivia {
    constructor() {
      this.score = 0;
      this.category = { id: null, title: null };
      this.question = null;
      this.answer = null;
    }
  
    updateCategory(category) {
      this.category.id = category.id;
      this.category.title = category.title;
    }
  
    updateScore(reset = false) {
      if (reset) {
        this.score = 0;
      } else {
        this.score++;
      }
    }
  
    renderScoreBoard() {
      const scoreElement = document.getElementById("score");
      const categoryElement = document.getElementById("category");
      scoreElement.innerHTML = this.score;
      categoryElement.innerHTML = this.category.title;
    }
  
    updateQuestionAndAnswer(question, answer) {
      this.question = question;
      this.answer = answer;
    }
  
    renderQuestion() {
      const questionBlock = document.getElementById("question");
      const paragarphElement = document.createElement("p");
  
      if (questionBlock.hasChildNodes()) {
        questionBlock.removeChild(questionBlock.lastElementChild);
      }
  
      paragarphElement.innerHTML = this.question;
      questionBlock.appendChild(paragarphElement);
    }
  }
  
  
  const fetchData = async (url) => {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    return jsonResponse;
  };
  
  const getRandomCategory = async () => {
    const url = "https://jservice.io/api/random?count=100";
    return await fetchData(url);
  };
  
  const getNextQuestion = async (categoryId) => {
    const url = "https://jservice.io/api/clues?category=" + categoryId;
    return await fetchData(url);
  };
  
  const startGame = async (trivia) => {
    const randomCategory = await getRandomCategory();
  
    const randomIndex = Math.floor(Math.random() * 100);
    const category = randomCategory[randomIndex].category;
  
    console.log(randomCategory[randomIndex]); // hint
  
    trivia.updateCategory(category);
    trivia.updateQuestionAndAnswer(
      randomCategory[randomIndex].question,
      randomCategory[randomIndex].answer
    );
  
    trivia.renderScoreBoard();
    trivia.renderQuestion();
  
    const gameBoard = document.getElementById("game_board");
    gameBoard.style.display = "block";
  };
  
  const renderNextQuestion = async (trivia) => {
    const nextQuestion = await getNextQuestion(trivia.category.id);
  
    const randomIndex = Math.floor(Math.random() * nextQuestion.length);
  
    console.log(nextQuestion[randomIndex]); // hint
  
    trivia.updateQuestionAndAnswer(
      nextQuestion[randomIndex].question,
      nextQuestion[randomIndex].answer
    );
    trivia.renderQuestion();
  };
  
  const displayMessage = (element, message, backgroundColor) => {
    const paragraph = document.createElement("p");
  
    if (element.hasChildNodes()) {
      element.removeChild(element.lastElementChild);
    }
  
    paragraph.innerHTML = message;
    element.style.background = backgroundColor;
    element.append(paragraph);
    element.style.display = "block";
  
    const removeMessage = () => {
      element.style.display = "none";
    };
  
    setTimeout(removeMessage, 2000);
  };
  
  const verifyAnswer = (trivia) => {
    const guessedAnswer = document.getElementById("answer_box");
  
    if (trivia.answer.toLowerCase() === guessedAnswer.value.toLowerCase()) {
        const messageElement =document.getElementById("success_message")
      displayMessage(messageElement, "Congratulations!!", "green");
  
      trivia.updateScore();
      trivia.renderScoreBoard();
      renderNextQuestion(trivia);
    } else {
        const messageElement = document.getElementById("game_over_message")
      displayMessage(messageElement, "Game Over", "red");
  
      trivia.updateScore(true);
      trivia.renderScoreBoard();
  
      const gameBoard = document.getElementById("game_board");
      gameBoard.style.display = "none";
    }
  
    guessedAnswer.value = "";
  };
  
  const trivia = new Trivia();
  
  const startButton = document.getElementById("start_button");
  startButton.addEventListener("click", () => startGame(trivia));
  
  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", () => verifyAnswer(trivia));

