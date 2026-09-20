/* =========================================================
   PHOTO PUZZLE IMAGE
========================================================= */


/*
    ========================================================
    CHANGE YOUR PUZZLE PHOTO HERE
    ========================================================

    Put your photo inside:

    images/puzzle.jpg

    Then leave this line as it is.

    OR change it to another filename:

    images/her-photo.jpg

    Supported formats:

    JPG
    JPEG
    PNG
    WEBP
*/

const puzzleImage =
    "images/puzzle.jpg";



/* =========================================================
   SCREEN NAVIGATION
========================================================= */

const screens =
    document.querySelectorAll(".screen");


function goTo(screenID) {

    screens.forEach(function(screen) {

        screen.classList.remove("active");

    });


    const nextScreen =
        document.getElementById(screenID);


    nextScreen.classList.add("active");


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    /*
        If puzzle screen is opened,
        make sure puzzle exists.
    */

    if (screenID === "puzzle") {

        createPuzzle();

    }

}



/* =========================================================
   MUSEUM DOOR
========================================================= */

let knocks = 0;


function knockDoor() {

    knocks++;


    const door =
        document.getElementById(
            "doorButton"
        );


    const message =
        document.getElementById(
            "knockText"
        );


    /*
        Door knocking animation
    */

    door.animate(

        [

            {
                transform: "scale(1)"
            },

            {
                transform: "scale(.96)"
            },

            {
                transform: "scale(1)"
            }

        ],

        {

            duration: 180

        }

    );


    if (knocks === 1) {

        message.textContent =
            "Knock 1… ✨";

    }


    else if (knocks === 2) {

        message.textContent =
            "Knock 2… one more 💗";

    }


    else {

        message.textContent =
            "The museum is opening… 🥹";


        setTimeout(function() {

            goTo("gallery");

        }, 700);

    }

}



/* =========================================================
   PHOTO PUZZLE
========================================================= */


/*
    3 x 3 puzzle:

       0 | 1 | 2
      ---+---+---
       3 | 4 | 5
      ---+---+---
       6 | 7 | 8


    Each number represents a section
    of the original photo.
*/


let puzzleOrder = [

    0, 1, 2,

    3, 4, 5,

    6, 7, 8

];


let selectedPiece = null;


const puzzleBoard =
    document.getElementById(
        "puzzleBoard"
    );



/* =========================================================
   SHUFFLE PUZZLE
========================================================= */

function shufflePuzzle() {

    /*
        Start with the correct order.
    */

    puzzleOrder = [

        0, 1, 2,

        3, 4, 5,

        6, 7, 8

    ];


    /*
        Randomly swap pieces.

        Because our puzzle uses
        piece swapping rather than
        sliding, every shuffled
        arrangement can be solved.
    */

    for (
        let i = puzzleOrder.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            puzzleOrder[i],
            puzzleOrder[randomIndex]

        ] = [

            puzzleOrder[randomIndex],
            puzzleOrder[i]

        ];

    }


    /*
        Make sure it isn't
        accidentally already solved.
    */

    if (isPuzzleSolved()) {

        shufflePuzzle();

    }

}



/* =========================================================
   CREATE PUZZLE
========================================================= */

function createPuzzle() {

    if (!puzzleBoard) {

        return;

    }


    /*
        Create the initial
        shuffled puzzle only once.
    */

    if (!puzzleBoard.dataset.started) {

        shufflePuzzle();

        puzzleBoard.dataset.started =
            "true";

    }


    puzzleBoard.innerHTML = "";


    puzzleOrder.forEach(

        function(piece, position) {


            const tile =
                document.createElement(
                    "button"
                );


            tile.className =
                "tile";


            tile.setAttribute(
                "type",
                "button"
            );


            /*
                Which column is
                this image piece?
            */

            const column =
                piece % 3;


            /*
                Which row is
                this image piece?
            */

            const row =
                Math.floor(
                    piece / 3
                );


            /*
                Put the actual
                puzzle photo on
                every piece.
            */

            tile.style.backgroundImage =
                `url("${puzzleImage}")`;


            /*
                Move the image
                behind the tile.

                This creates the
                individual photo piece.
            */

            const puzzleSize =
                window.innerWidth <= 380
                    ? 280
                    : 330;


            tile.style.backgroundSize =
                `${puzzleSize}px ${puzzleSize}px`;


            tile.style.backgroundPosition =

                `${-(column * puzzleSize / 3)}px ` +

                `${-(row * puzzleSize / 3)}px`;


            /*
                Click the tile.
            */

            tile.addEventListener(
                "click",
                function() {

                    selectPuzzlePiece(
                        position,
                        tile
                    );

                }
            );


            puzzleBoard.appendChild(
                tile
            );

        }

    );

}



/* =========================================================
   SELECT PUZZLE PIECE
========================================================= */

function selectPuzzlePiece(
    position,
    tile
) {


    /*
        First tile selected.
    */

    if (
        selectedPiece === null
    ) {

        selectedPiece =
            position;


        tile.classList.add(
            "selected"
        );


        return;

    }



    /*
        User selected
        the same tile again.
    */

    if (
        selectedPiece === position
    ) {

        selectedPiece = null;


        tile.classList.remove(
            "selected"
        );


        return;

    }



    /*
        Swap the two pieces.
    */

    const temporary =
        puzzleOrder[selectedPiece];


    puzzleOrder[selectedPiece] =
        puzzleOrder[position];


    puzzleOrder[position] =
        temporary;


    /*
        Reset selection.
    */

    selectedPiece = null;


    /*
        Redraw the puzzle.
    */

    createPuzzle();


    /*
        Check if solved.
    */

    checkPuzzle();

}



/* =========================================================
   CHECK PUZZLE
========================================================= */

function isPuzzleSolved() {

    return puzzleOrder.every(

        function(value, index) {

            return value === index;

        }

    );

}



function checkPuzzle() {

    if (
        !isPuzzleSolved()
    ) {

        return;

    }


    /*
        Puzzle completed.
    */

    const message =
        document.getElementById(
            "puzzleMessage"
        );


    message.textContent =
        "Perfect! Memory restored. 🥹";


    /*
        Show next button.
    */

    const nextButton =
        document.getElementById(
            "puzzleNext"
        );


    nextButton.classList.remove(
        "hidden"
    );


    /*
        Celebration animation.
    */

    puzzleBoard.animate(

        [

            {
                transform: "scale(1)"
            },

            {
                transform: "scale(1.04)"
            },

            {
                transform: "scale(1)"
            }

        ],

        {

            duration: 500

        }

    );

}



/* =========================================================
   RESET PUZZLE
========================================================= */

function resetPuzzle() {

    puzzleBoard.dataset.started =
        "false";


    selectedPiece = null;


    shufflePuzzle();


    createPuzzle();


    document.getElementById(
        "puzzleMessage"
    ).textContent =
        "Restore the photo.";


    document.getElementById(
        "puzzleNext"
    ).classList.add(
        "hidden"
    );

}



/* =========================================================
   PROMISE
========================================================= */

function sealPromise() {


    const checkboxes =
        document.querySelectorAll(
            ".promise-list input"
        );


    const signature =
        document.getElementById(
            "signatureInput"
        ).value.trim();


    /*
        Check whether
        all promises are selected.
    */

    const allChecked =
        [...checkboxes].every(

            function(checkbox) {

                return checkbox.checked;

            }

        );


    if (!allChecked) {

        document.querySelector(
            "#promise .section-label"
        ).textContent =
            "CHECK EVERY PROMISE FIRST 💗";


        return;

    }


    /*
        Show final message.
    */

    const finalMessage =
        document.getElementById(
            "finalMessage"
        );


    finalMessage.classList.remove(
        "hidden"
    );


    /*
        Add signature if provided.
    */

    if (
        signature !== ""
    ) {

        finalMessage.querySelector(
            "h3"
        ).textContent =

            `Promise sealed, ${signature}. 🥹`;

    }


    finalMessage.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}



/* =========================================================
   INITIALIZE PUZZLE
========================================================= */

createPuzzle();