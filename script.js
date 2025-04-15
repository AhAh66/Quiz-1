
let questionTopic=document.querySelector(".topic");
let question=document.querySelector(".quiz-question");
let score=document.querySelector(".score");
let options=document.querySelector(".options")
let currentIndex=0;
let correctCount=0;
let questions=[];




async function loadTheAPI(){
    // conatiner.innerHTML='loading....'
    let Apikey='https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple';
    let result=await fetch(`${Apikey}`);
    let data=await result.json()
    //let data=await result.json();
    console.log(result)
    console.log(data)
    questions=data.results;
    show(questions[currentIndex],currentIndex+1,questions.length)
}


function decodeHtml(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}





function show(questionData,questionIndex,totalQuestion){
   question.textContent=decodeHtml(questionData.question) ;
   questionTopic.textContent=questionData.category;
    score.textContent=`${questionIndex} / ${totalQuestion}`;
    let incorrectAnswers=questionData.incorrect_answers;
    let correctAnswer=questionData.correct_answer;
    let allAnswes=[...incorrectAnswers,correctAnswer];
    allAnswes.sort(()=>Math.random()-0.5);
    allAnswes.forEach(answer=>{
let li=document.createElement("li");
li.textContent=decodeHtml(answer);
li.addEventListener("click",()=>checkAnser(li,correctAnswer))
options.appendChild(li)
    })

}



function checkAnser(selectedOption,correctAnswer){
    let allOption=document.querySelectorAll(".options li");
    allOption.forEach(Option=>Option.style.pointerEvents ="none");

    if(selectedOption.textContent === decodeHtml(correctAnswer)){
     selectedOption.classList.add("correct");
        correctCount++
    }
    else{
      selectedOption.classList.add("incorrect");
        allOption.forEach(option=>{
            if(option.textContent === decodeHtml(correctAnswer)){
                option.classList.add("correct");
            }
        })
    }

    setTimeout(()=>{
        currentIndex++;
        options.innerHTML='';

        if(currentIndex<questions.length){
            show(questions[currentIndex],currentIndex+1,questions.length)
        }
        else {
            let finalresult=document.querySelector(".result-container")
            container.style.display = "none";
            finalresult.style.display = "block";
            let finalScore = document.querySelector("#final-score"); // ← أصلحناه هنا
            finalScore.innerHTML = `You got ${correctCount} out of ${questions.length}`;
            questionTopic.innerHTML = '';
          
        }
        
    },2000)



}
document.querySelector("#restart").addEventListener("click", () => {
    currentIndex = 0;
    correctCount = 0;
    let finalresult=document.querySelector(".result-container")
    finalresult.style.display = "none";
    loadTheAPI()
    container.style.display = "block";
});



// loadTheAPI()
let container = document.querySelector(".container")


let homeContainer=document.querySelector(".home-container")
document.querySelector("#start").addEventListener("click",()=>{
    homeContainer.style.display = "none";
    container.style.display = "block";


    loadTheAPI();
})

var typed = new Typed('.typeing', {
    strings: ["good to see you ","Welcome to the quiz page"],
    typeSpeed: 90
  });
  


