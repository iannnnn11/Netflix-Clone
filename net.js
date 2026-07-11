let question= document.querySelectorAll(".faq-question");
question.forEach(function(question){
    question.addEventListener("click",()=>{
        let answer=question.nextElementSibling;
        answer.classList.toggle("active");

    });
    
});

let cards=document.querySelectorAll(".card");
cards.forEach(function(card){
    card.addEventListener("click",()=>{
        let movieId=card.getAttribute("data-id");
        window.location.href=`login.html?id=${movieId}`;
    });
});
let question1 = document.querySelector(".question");
let answer1 = document.querySelector(".answer");

question1.addEventListener("click", function(){

    answer1.classList.toggle("active");

});
fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=9f83a5cea3a23db23f555c347d1877ec`)