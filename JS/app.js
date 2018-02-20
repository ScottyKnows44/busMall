'use strict';

// global variables

var totalVotes = 0;
var threePictures = [];
var pics = document.getElementById('pics');
var leftPicture = document.getElementById('left');
var centerPicture = document.getElementById('center');
var rightPicture = document.getElementById('right');
var allPictures = [];

// constructor for pictures

function SurveyPicture(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.votesPerPicture = 0;
  allPictures.push(this);
}

// list of all all pictures used in the constructor

new SurveyPicture('bag', 'img/bag.jpg');
new SurveyPicture('banana', 'img/banana.jpg');
new SurveyPicture('bathroom', 'img/bathroom.jpg');
new SurveyPicture('boots', 'img/boots.jpg');
new SurveyPicture('breaskfast', 'img/breakfast.jpg');
new SurveyPicture('bebblegum', 'img/bubblegum.jpg');
new SurveyPicture('chair', 'img/chair.jpg');
new SurveyPicture('cthulhu', 'img/cthulhu.jpg');
new SurveyPicture('dog-duck', 'img/dog-duck.jpg');
new SurveyPicture('dragon', 'img/dragon.jpg');
new SurveyPicture('pen', 'img/pen.jpg');
new SurveyPicture('pet-sweep', 'img/pet-sweep.jpg');
new SurveyPicture('scissors', 'img/scissors.jpg');
new SurveyPicture('shark', 'img/shark.jpg');
new SurveyPicture('sweep', 'img/sweep.jpg');
new SurveyPicture('tauntaun', 'img/tauntaun.jpg');
new SurveyPicture('unicorn', 'img/unicorn.jpg');
new SurveyPicture('usb', 'img/usb.jpg');
new SurveyPicture('water-can', 'img/water-can.jpg');
new SurveyPicture('wine-glass', 'img/wine-glass.jpg');

// function to randomly display picture

function randomPicture() {
  var randomPictureOutOfEverything = Math.floor(Math.random() * allPictures.length);
  allPictures[randomPictureOutOfEverything];
  return randomPictureOutOfEverything;
}

// event listener
pics.addEventListener('click', votingOnPictures);

// gets three pictures and adds them to array

function choosingThreePictures() {
  while ( threePictures.length < 6) {
    var flag = false;
    var indexOfPictures = randomPicture();
    for ( var i = 0; i < threePictures.length; i++) {
      if (indexOfPictures === threePictures[i]) {
        flag = true;
      }
    }
    if ( flag === false) {
      threePictures.push(indexOfPictures);
    }
  }

  threePictures.splice(0, 3);

}
choosingThreePictures();

// takes the three pictures and displays them

function displayPictures(){
  leftPicture.src = allPictures[threePictures[0]].filepath;
  leftPicture.alt = allPictures[threePictures[0]].name;
  leftPicture.title = allPictures[threePictures[0]];
  centerPicture.src = allPictures[threePictures[1]].filepath;
  centerPicture.alt = allPictures[threePictures[1]].name;
  centerPicture.title = allPictures[threePictures[1]];
  rightPicture.src = allPictures[threePictures[2]].filepath;
  rightPicture.alt = allPictures[threePictures[2]].name;
  rightPicture.title = allPictures[threePictures[2]];
}

displayPictures();

// Event handler voting on pictures

function votingOnPictures (event) {
  if (event.target.alt) {
    totalVotes++;
    for (var i =0; i < threePictures.length; i++) {
      if (event.target.alt === allPictures[threePictures[i]].name) {
        allPictures[threePictures[i]].votesPerPicture++;
      }
    }
    if (totalVotes > 24) {
      pics.removeEventListener('click', votingOnPictures);
      pics.innerHTML= '';
      totalVotesForEverything();
    }
    choosingThreePictures();
    displayPictures();
  }
}

// makes the list of total votes per pictures and displays them

function totalVotesForEverything(){
  var voteForm = document.createElement('ul');
  var dataSection = document.getElementById('data');
  for (var i = 0; i < allPictures.length; i++) {
    var trEl = document.createElement('li');
    trEl.textContent = allPictures[i].name + ' Has ' + allPictures[i].votesPerPicture;
    console.log(i, allPictures[i].name, allPictures[i].votesPerPicture);
    voteForm.appendChild(trEl);
  }
  dataSection.appendChild(voteForm);
}