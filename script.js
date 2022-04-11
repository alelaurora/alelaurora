$(document).ready(function() {
    var colors = ["#739600", "#1F5EA8", "#F72C2C", "#FA5021", "#FB9F54", "#FFAD00,#FFEB3B", "#55C934", "#4CAF58", "#1FA895", "#1FD2DB", "#2196F3", "#61338F", "#8F3378", "#E91E63", "#B32E37"];
    var rand = Math.floor(Math.random() * colors.length);
    $('.change').css("background-color", colors[rand]);
});

// $('a').click(function(){
//     $('html, body').animate({
//         scrollTop: $( $(this).attr('href') ).offset().top
//     }, 500);
//     return false;
// });

var words = ['Making digital things.','Easier.','Seamless','Delightful experiences.','Focusing on the important'],
    currentStep = 0,
    textEl = document.querySelector('.change-text'),
    oldWord = '';


setTimeout(changeWord, 800);

function changeWord() {
    oldWord = textEl.innerHTML;

    // check if there is a word atm or not
    if (oldWord.length < 1) {

        if (currentStep !== words.length -1) {
            currentStep ++;
        }else {
        currentStep = 0;
        }
        addNextWord();
    } else {
        setTimeout(deleteWord, 400);
    }
};

function deleteWord() {
  var WordLength = oldWord.length,
      currentWord = textEl.innerHTML,
      currentLength = currentWord.length;
  

  // The word is deleted so, start adding in the new one
  if (currentLength < 1) {
    changeWord();
    return;
  }
  
  // Remove a charachter
  textEl.innerHTML = currentWord.substring(0, currentLength - 1);
  
  setTimeout(deleteWord, 70);
}

function addNextWord() {
  var currentWord = textEl.innerHTML,
      currentLength = currentWord.length,
      nextWord = words[currentStep],
      nextWordLength = nextWord.length;
    
  
  if (currentLength === nextWordLength) {
    changeWord();
    return;
  }
  
  // add a charachter
  textEl.innerHTML = nextWord.substring(0, currentLength + 1);
    
  setTimeout(addNextWord, 200);
}

//Get the button
var mybutton = document.getElementById("btn-go-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}