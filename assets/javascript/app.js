//game counters
var counter = 0;
var correctCounter = 0;
var wrongCounter = 0;

console.log("Questions asked: " + counter);

var questions = [
  {
    //question one
    question:
      "South Africa has the oldest meteor scar in the world, just across the Vaal River near Parys, called the:  ",
    choices: [
      "Table Mountain",
      "Vredefort Dome",
      "Kilamanjaro",
      "Parysenna Bowl"
    ],
    answer: 1,
    answerText: "Vredefort Dome",
    image: '<img src="assets/images/Map_of_Vredefort_dome.jpg"/>'
  },
  {
    //question two
    question: "South Africa generates ______________ of Africa’s electricity.",
    choices: ["three-quarters", "one-half", "two-thirds", "one-quarter"],
    answer: 2,
    answerText: "two-thirds",
    image: '<img src="assets/images/coal_plant-exxaro-suez-gdf-south-africa.jpg"/>'
  },
  {
    //question three
    question: "The world’s best land-based whale-watching spot is located in Hermanus in the ___________ Cape.",
    choices: ["Northern", "Southern", "Eastern", "Western"],
    answer: 3,
    answerText: "Western",
    image: '<img src="assets/images/western-cape.png"/>'
  },
  {
    //question four
    question: "Since the 1940s, South African golfers have won more majors than any other nation, apart from _________________.",
    choices: [
      "Australia",
      "the United States",
      'the United Kingdom',
      "New Zealand"
    ],
    answer: 1,
    answerText: "the United States",
    image: '<img src="assets/images/SA-golf.jpg"/>'
  },
  {
    //question five
    question: "Almost a quarter of South Africa’s non-interest budget is spent on __________.",
    choices: ["education", "roadways", "military", "foreign aid"],
    answer: 0,
    answerText: "education",
    image: '<img src="assets/images/SA-school.jpg"/>'
  },
  {
    //question six
    question:
      "In 1991, South Africa became the first country in the world to protect the ______________.",
    choices: ["Killer Whale", "Brown Bear", "Leopard", "Great White Shark"],
    answer: 3,
    answerText: "Great White Shark",
    image: '<img src="assets/images/SA-shark.jpg"/>'
  }
];

var timer = {
  start: 25,
  reset: function() {
    timer.start = 25;
    clearInterval(countDown);
    $("#timer").html("Time to answer: " + timer.start + " seconds");
  },
  run: function() {
    countDown = setInterval(timer.increment, 1000);
  },
  increment: function() {
    timer.start--;
    $("#timer").html("Time to answer: " + timer.start + " seconds");
    if (timer.start === 0) {
      clearInterval(countDown);
    }
  },
  stop: function() {
    clearInterval(countDown);
    countDown = setInterval(timer.increment, 1000);
  }
};

$("#startGame").click(function() {
  $("#startGame").hide();
  createQuestion();
});

function createQuestion() {
  timer.run();

  $(".continueButton").hide();

  $("#question").show();
  $(".answerButton").show();

  $("#question").html(questions[counter].question);

  for (var i = 0; i < questions[counter].choices.length; i++) {
    $("#answer" + i).html(questions[counter].choices[i]);
  }
}

var continueButton = {
  buttonText: "Click to continue",
  createButton: function() {
    $(".continueButton").html(continueButton.buttonText);
  },
  buttonClick: $(".continueButton").click(function() {
    $(".rightWrong").hide();
    $(".correctAnswerIs").hide();
    $(".images").hide();
    $(".continueButton").hide();
    timer.stop();
    timer.reset();
    if (counter === 6) {
      finalPage();
    } else {
      createQuestion();
    }
  })
};

$(".answerButton").click(function() {
  $("#question").hide();
  $(".answerButton").hide();

  $(".rightWrong").show();
  $(".correctAnswerIs").show();
  $(".images").show();

  var buttonClickedText = this.textContent;
  console.log("Answer picked: " + buttonClickedText);

  timer.stop();

  if (this.textContent === questions[counter].answerText) {
    correctCounter++;
    console.log("Number of correct answers: " + correctCounter);
    $(".rightWrong").html("Correct!");
    $(".images").html(questions[counter].image);
    counter++;
    console.log("Questions: " + counter);
    $(".continueButton").show();
    continueButton.createButton();
  } else {
    wrongCounter++;
    console.log("Number of incorrect answers: " + wrongCounter);
    $(".rightWrong").html("Wrong answer!");
    $(".correctAnswerIs").html(
      "The correct answer was: " + questions[counter].answerText
    );
    $(".images").html(questions[counter].image);
    counter++;
    console.log("Questions: " + counter);
    $(".continueButton").show();
    continueButton.createButton();
  }
});

var restartButton = {
  buttonText: "Start Over",
  createButton: function() {
    $("#startOver").html(restartButton.buttonText);
  },
  buttonClick: $("#startOver").click(function() {
    timer.stop();
    timer.reset();
    createQuestion();
  })
};

function finalPage() {
  $(".answerButton").hide();
  if (correctCounter > 4) {
    $(".endTitle").html("Great job!");
    $("#endSubText").html("You're pretty much an expert, keep being awesome.");
  } else if ((correctCounter = 3) || (correctCounter = 4)) {
    $(".endTitle").html("Well done!");
    $("#endSubText").html(
      "You're not quite an expert, but you have some general knowledge of SA."
    );
  } else {
    $(".endTitle").html("Still more to learn!");
    $("#endSubText").html("Read more about South Africa and play again!");
  }

  $("#rightQuestions").html(
    "You answered " + correctCounter + " questions correctly."
  );
  $("#wrongQuestions").html(
    "You answered " + wrongCounter + " questions incorrectly."
  );
  restartButton.createButton();
}

// var questions = [{
//     question: "What is 2*5?",
//     choices: [2, 5, 10, 15, 20],
//     correctAnswer: 2
//   }, {
//     question: "What is 3*6?",
//     choices: [3, 6, 9, 12, 18],
//     correctAnswer: 4
//   }, {
//     question: "What is 8*9?",
//     choices: [72, 99, 108, 134, 156],
//     correctAnswer: 0
//   }, {
//     question: "What is 1*7?",
//     choices: [4, 5, 6, 7, 8],
//     correctAnswer: 3
//   }, {
//     question: "What is 8*8?",
//     choices: [20, 30, 40, 50, 64],
//     correctAnswer: 4
//   }];
