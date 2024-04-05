<?php
include 'data.php'; // Import sentences

// Choose a random sentence
$selectedSentence = $sentences[array_rand($sentences)];
$words = explode(' ', $selectedSentence); // Split into words

// Function to calculate bubble size
function calculateBubbleSize($word) {
    return max(2, strlen($word)) * 10; // Example size calculation
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exploding Bubble Game</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
    #gameBox {
        width: 400px;
        /* Smaller width */
        height: 400px;
        /* Starting height, can grow as needed */
        position: relative;
        overflow: hidden;
        border: 2px solid black;
        margin: 0 auto;
        /* Center the box */
    }


    .bubble {
        position: absolute;
        border-radius: 50%;
        text-align: center;
        padding: 5px;
        background-color: skyblue;
        cursor: pointer;
        /* Indicate the bubbles are clickable */
    }

    </style>
</head>

<body>
    <div class="container mt-5">
        <button id="startGame" class="btn btn-primary">Start</button>
        <div id="gameBox" data-words='<?php echo json_encode($words); ?>'></div>
        <div id="completedWords"></div>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="gameLogic.js"></script>
</body>

</html>
