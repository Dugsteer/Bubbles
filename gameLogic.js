$(document).ready(function () {
  let words = JSON.parse($("#gameBox").attr("data-words"));
  let correctOrder = words.slice();
  let userSequence = [];

  $("#startGame").click(function () {
    $(this).hide(); // Hide start button
    shuffleAndDisplayWords(words);
  });

  function shuffleAndDisplayWords(words) {
    words = shuffle(words);
    $("#gameBox").empty(); // Clear previous game content

    let containerWidth = $("#gameBox").width(); // Get the dynamic width of the game box
    let bubblePositions = calculateBubblePositions(words, containerWidth);
    bubblePositions.forEach((pos, index) => {
      let word = words[index];
      let bubble = $("<div></div>")
        .addClass("bubble")
        .css({
          width: pos.size + "px",
          height: pos.size + "px",
          lineHeight: pos.size + "px",
          left: pos.x + "px",
          top: pos.y + "px",
        })
        .text(word)
        .appendTo("#gameBox");

      bubble.click(function () {
        checkWord($(this), word, index);
      });
    });
  }

  function calculateBubblePositions(words, containerWidth) {
    let positions = [];
    let totalWidthUsed = 0;
    let maxHeight = 0;
    let yPos = 0;

    words.forEach((word) => {
      let bubbleSize = Math.max(
        100,
        Math.min(160, word.length * 10 + Math.random() * 120)
      );
      if (totalWidthUsed + bubbleSize > containerWidth) {
        yPos += maxHeight; // Adjust vertical position for the next row
        totalWidthUsed = 0;
        maxHeight = 0;
      }

      positions.push({
        x: totalWidthUsed,
        y: yPos,
        size: bubbleSize, // Randomized size
      });

      totalWidthUsed += bubbleSize;
      maxHeight = Math.max(maxHeight, bubbleSize);
    });

    return positions;
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

function checkWord(bubble, word, index) {
  if (word === correctOrder[userSequence.length]) {
    userSequence.push(word);
    // Remove the clicked word from the words array
    words.splice(words.indexOf(word), 1);

    bubble.fadeOut(300, function () {
      // Append the word to the completed words list
      $("<span></span>")
        .text(word + " ")
        .appendTo("#completedWords");

      // Remove the bubble after fading out
      $(this).remove();

      // Check if the game is completed inside the fadeOut completion callback
      // This ensures the final word is added below before the game completion check
      if (userSequence.length === correctOrder.length) {
        gameCompleted();
      } else {
        // Adjust positions of remaining bubbles
        adjustBubblePositions();
      }
    });
  } else {
    alert("Wrong order! Try again.");
  }
}

// New function to adjust positions of remaining bubbles without reshuffling
function adjustBubblePositions() {
  $("#gameBox").empty(); // Clear the box before redrawing bubbles
  let containerWidth = $("#gameBox").width();
  let bubblePositions = calculateBubblePositions(words, containerWidth); // Recalculate positions for remaining words
  bubblePositions.forEach((pos, index) => {
    let word = words[index];
    let bubble = $("<div></div>")
      .addClass("bubble")
      .css({
        width: pos.size + "px",
        height: pos.size + "px",
        lineHeight: pos.size + "px",
        left: pos.x + "px",
        top: pos.y + "px",
      })
      .text(word)
      .appendTo("#gameBox");

    bubble.click(function () {
      checkWord($(this), word, index);
    });
  });
}


function gameCompleted() {
  setTimeout(function () {
    alert("Congratulations! You completed the sentence.");
    $("#startGame").show();
    $("#completedWords").empty(); // Clear completed words for the next round
  }, 100); // Short delay to ensure the UI updates are visible before the alert
}
});
