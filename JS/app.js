//question api:
// https://api.jsonbin.io/v3/b/636634100e6a79321e401a3e?meta=false
const questionCard = document.getElementById("questionCard");
const answerCard = document.getElementById("answerCard");
const flipBot = document.getElementById("flipBot");
let currentQuestions
async function getDataFromApi() {
  try {
    const url =
      "https://api.jsonbin.io/v3/b/636634100e6a79321e401a3e?meta=false";
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

const questionsList = [];
    

async function renderQuestion() {
  let data = await getDataFromApi();
  data.questions.forEach((q) => {
    questionsList.push(q);
  });

  const sideNavUl = document.getElementById("questionList");
  questionsList.forEach((q) => {
    sideNavUl.innerHTML += `
    <li><button class="loadQuestion">${q.questionNum}</button></li>
    `;
  });

  let questionsListNavLI = document.querySelectorAll(".loadQuestion");
  questionsListNavLI.forEach((el) => {
    el.addEventListener("click", function () {
        currentQuestions=questionsList[this.innerHTML - 1].questionNum
        
      questionCard.innerHTML = `
      <h3 class="qCardTitle">Questions</h4>
      <h4 class="qNum"></h4>question number: ${
        questionsList[this.innerHTML - 1].questionNum
      }</h4>
      <h4 class="qCardSubjects">include subjects: ${
        questionsList[this.innerHTML - 1].subSubjects
      }</h4>
      <br>
      <h4>question:</h4>
      <p class="qCardContent">${questionsList[this.innerHTML - 1].qText}</p>

    `;
      answerCard.innerHTML = `
    <h4>Options:</h4>
    <ul id="cardQuestionOptions">
        <li class="optionalAnswer" ><input type="checkbox" id="checkA">${
          questionsList[this.innerHTML - 1].options["A"]
        }</li>
        <li class="optionalAnswer" ><input type="checkbox" id="checkB">${
          questionsList[this.innerHTML - 1].options["B"]
        }</li>
        <li class="optionalAnswer" ><input type="checkbox" id="checkC">${
          questionsList[this.innerHTML - 1].options["C"]
        }</li>
        <li class="optionalAnswer" ><input type="checkbox" id="checkD">${
          questionsList[this.innerHTML - 1].options["D"]
        }</li>
    </ul>
    `;
    });
  });
  return 
}
renderQuestion();

function checkAnswer() {
    let pickedOption = [];

  flipBot.addEventListener("click", () => {
    let checkA = document.getElementById("checkA");
    let checkB = document.getElementById("checkB");
    let checkC = document.getElementById("checkC");
    let checkD = document.getElementById("checkD");
    
      if (checkA.checked == true) {
        pickedOption.push("A");
      }
      if (checkB.checked == true) {
        pickedOption.push("B");

      } 
      if (checkC.checked == true) {
        pickedOption.push("C");

      } 
      if (checkD.checked == true) {
        pickedOption.push("D");

      }  
      else {
      }
      console.log("currentQuestions",currentQuestions-1);
      console.log("pickedOption",pickedOption);
      console.log("rightAnswers",questionsList[currentQuestions-1].rightAnswers);
      if (pickedOption[0]===questionsList[currentQuestions-1].rightAnswers) {
        answerCard.innerHTML = `
        <h2 id="rightAnswer">right!</h2>
        <h4>the right Answer was ${questionsList[currentQuestions-1].explanation}</h3>
        `
      }else{
        answerCard.innerHTML = `
        <h2 id="worngAnswer">Worng</h2>
        <h3>the right Answer was ${questionsList[currentQuestions-1].rightAnswers}</h3>
        <h4>the right Answer was ${questionsList[currentQuestions-1].explanation}</h3>
        `
      }
      pickedOption = [];
    });

}
checkAnswer(); 
