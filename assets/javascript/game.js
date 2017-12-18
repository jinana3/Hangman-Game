//Jina's attempt
//array in array idea from Chetan :)
//currently did not incorporate logic that would allow spaces between words
var wordBank = [
["A", "R", "C", "H", "E", "S"],
["A", "U", "S", "T", "R", "I", "A"],
["B", "E", "R", "K", "E", "L", "E", "Y"],
["C", "A", "P", "I", "T", "O", "L", "R", "E", "E", "F"],
["C", "H", "I", "C", "A", "G", "O"],
["C", "H", "I", "N", "A"],
["E", "N", "G", "L", "A", "N", "D"],
["F", "R", "A", "N", "C", "E"],
["I", "C", "E", "L", "A", "N", "D"],
["I", "T", "A", "L", "Y"],
["J", "A", "P", "A", "N"],
["S", "A", "N", "F", "R", "A", "N", "C", "I", "S", "C", "O"],
["S", "W", "I", "T", "Z", "E", "R", "L", "A", "N", "D"],
["T", "O", "R", "O", "N", "T", "O"],
["Y", "O", "S", "E", "M", "I", "T", "E"]
];

//var random = Math.floor(Math.random() * (wordBank.length));
//0 included, length excluded, so perfect for indexing 
//randomly choose a word - there is no reason  to do this, perhaps in future iterations can try to randomly draw, 
//but a game should not be drawing the same word twice
//-------------------------------------//
var userWins = 0; //keeping track of number of words guessed correctly
//------------------------------------//
//initialize
var wordsRemaining = wordBank.length; //keeping track of words in wordBank to avoid replaying same word
var currentWord = wordBank[wordsRemaining - 1]; //current words
var blankWord = Array(currentWord.length); //making an empty array same length as current word
for(var i=0; i<blankWord.length;i++){
    blankWord[i] = "_ ";
};
var lettersGuessed = [];
var wrongCount = 6;
var hangmanCount = 0;
//-------------------------------------//
function printToHTML() { //function that overwrites #currentWord and #guessesRemaining - could do this in a better way
    $("#currentWord").html("Current Word: ");//overwrite what's in the html
    $("#currentWord").append(blankWord);//append current blankWord
    $("#guessesRemaining").html("Number of Guesses Remaining: ");
    $("#guessesRemaining").append(wrongCount);
};
function isInArray(array, letter) {//function to check if a letter is in an array
    return array.indexOf(letter) > -1;
};
function searchLetter(letter, array){//find all places where letter occurs in word
    var indices = [];
    for (var i=0; i<array.length; i++){
      if (letter === array[i]){
        indices.push(i);
      }
    }
    return indices;
};
function compareWords(array1, array2){//cannot compare arrays like string comparison, so need to make function
    // compare lengths
    if (array1.length != array2.length){
        return false;
    }
    for (var i = 0; i < array1.length; i++) {       
        if (array1[i] != array2[i]) { 
            return false;   
        }           
    }       
    return true;
};
function arrayToString(array){//if we want to print the array of letters as a string
  var string = "";
  for(i = 0; i<array.length; i++){
    string += array[i];
  }
  return string.toLowerCase();
};
function init() {
  printToHTML();
  $("#guessPhotos").attr("src", "assets/images/" + arrayToString(currentWord) + ".jpg");
};
window.onload = init;//not sure why we need this, will figure it out later -> need to think of way to start game
//-------------------------------------//
document.onkeyup = function keyPress(event){
  var userInputLetter = event.key; 
  userInputLetter = userInputLetter.toUpperCase();
  //take in user's key

  //1a. need to check if letter has been guessed before
    //2. if yes, then don't do anything
    //3. if not then store letter, and check against word -> print stored letter, and print updated word
    //4. check if word is complete; if so, move on to next word
  //1b. need to check if wordcount is out, if so need to move on to new word
  //1c. need to check if game all words have been guessed

  if (isInArray(lettersGuessed, userInputLetter)){//yes, don't do anything
    alert("letter already guessed!"); 
  }
  else{//no, store, check and print
    lettersGuessed.push(userInputLetter); //store letter
    $("#lettersGuessed").append(userInputLetter + " ");//print letter
    if(isInArray(currentWord, userInputLetter)){//check against word; if letter at least once in currentword
      console.log("it's right");
      var replaceIndices = searchLetter(userInputLetter, currentWord);
      for (var i=0; i<replaceIndices.length; i++){//update blankWord by replacing those indices that match
        blankWord[replaceIndices[i]] = userInputLetter;
      }
      console.log(blankWord);
    }
    else{//wrong guess, do nothing except subtract
      hangmanCount = hangmanCount + 1;
      wrongCount = wrongCount-1;
      $("#hangmanPhotos").attr("src", "http://www.writteninpencil.de/Projekte/Hangman/hangman" + hangmanCount + ".png")
      console.log("it's wrong");
    }
    printToHTML();//update word and check on wrongCount
    if(compareWords(currentWord, blankWord)){//check if this update made the word complete
      userWins = userWins +1; alert("you guessed the word correctly! It's " + arrayToString(currentWord) + "!");
      $("#userWins").html("Wins: ");
      $("#userWins").append(userWins);
      
      //change to new word and new photo, reset
      wordsRemaining = wordsRemaining -1;
      currentWord = wordBank[wordsRemaining - 1]; //current words
      blankWord = Array(currentWord.length); //making an empty array same length as current word
      for(var i=0; i<blankWord.length;i++){//initilaize blank word
        blankWord[i] = "_ ";
      };
      lettersGuessed = [];
      $("#lettersGuessed").html("Letters already Guessed: ")//reset HTML on this one
      hangmanCount = 0;
      wrongCount = 6;
      printToHTML();
      $("#guessPhotos").attr("src", "assets/images/" + arrayToString(currentWord) + ".jpg");

    }

  }
}

 
