
var turnCnt = 0;
var win = false;

//allow two users to play against each other
var twoPlayer = false;

function checkWin() {
    //get content of all spaces
    var pos0Cont = document.getElementById('pos0').innerHTML;
    var pos1Cont = document.getElementById('pos1').innerHTML;
    var pos2Cont = document.getElementById('pos2').innerHTML;
    var pos3Cont = document.getElementById('pos3').innerHTML;
    var pos4Cont = document.getElementById('pos4').innerHTML;
    var pos5Cont = document.getElementById('pos5').innerHTML;
    var pos6Cont = document.getElementById('pos6').innerHTML;
    var pos7Cont = document.getElementById('pos7').innerHTML;
    var pos8Cont = document.getElementById('pos8').innerHTML;

    //check for matches
    if (
        //horizontal
        (pos0Cont != "" && pos0Cont == pos1Cont && pos1Cont == pos2Cont) ||
        (pos3Cont != "" && pos3Cont == pos4Cont && pos4Cont == pos5Cont) ||
        (pos6Cont != "" && pos6Cont == pos7Cont && pos7Cont == pos8Cont) ||
        //vertical
        (pos0Cont != "" && pos0Cont == pos3Cont && pos3Cont == pos6Cont) ||
        (pos1Cont != "" && pos1Cont == pos4Cont && pos4Cont == pos7Cont) ||
        (pos2Cont != "" && pos2Cont == pos5Cont && pos5Cont == pos8Cont) ||
        //diagonal
        (pos0Cont != "" && pos0Cont == pos4Cont && pos4Cont == pos8Cont) ||
        (pos2Cont != "" && pos2Cont == pos4Cont && pos4Cont == pos6Cont)
    ) {
        win = true;
        return win;
    }
    //check for tie
    else if (pos0Cont != "" && pos1Cont != "" && pos2Cont != "" &&
        pos3Cont != "" && pos4Cont != "" && pos5Cont != "" &&
        pos6Cont != "" && pos7Cont != "" && pos8Cont != "") {
        //display tie
        document.getElementById("turn").innerHTML = "It's a Tie!";
        win = true;
        //show again btn
        document.getElementById("againBtn").style.display = "block";
    }
    else {
        win = false;
        return win;
    }
}

function checkPlace(pos) {
    var placeCont = document.getElementById(pos).innerHTML;

    if (placeCont == '' || placeCont == null) {
        return true;
    }
    else {
        return false;
    }
}

function computerTurn() {
    if (win == false && twoPlayer == false) {
        //clear warning
        document.getElementById("warning").innerHTML = "";

        //display computer turn
        document.getElementById("turn").innerHTML = "Computer Turn";

        //delay turn by 1 second
        setTimeout(function () {
            //randomize position
            var rand = Math.floor(Math.random() * 8);

            var pos = "pos" + rand;

            //debugging
            // console.log(pos);

            if (checkPlace(pos)) {
                document.getElementById(pos).innerHTML = "X";
                turnCnt++;
                if (checkWin()) {
                    //display computer win
                    document.getElementById("turn").innerHTML = "Computer Won!";
                    //show again btn
                    document.getElementById("againBtn").style.display = "block";
                }
                else {
                    //display your turn
                    document.getElementById("turn").innerHTML = "Your Turn";
                }
            }
            else {
                computerTurn();
            }
        }, 1000);

    }



}

function userTurn(pos) {
    if (win == false) {
        if (twoPlayer == false) {
            if (turnCnt % 2 == 0) {
                if (checkPlace(pos)) {
                    //clear warning
                    document.getElementById("warning").innerHTML = "";

                    document.getElementById(pos).innerHTML = "O";
                    turnCnt++;
                    if (checkWin()) {
                        //display user win
                        document.getElementById("turn").innerHTML = "User Won!";
                        //show again btn
                        document.getElementById("againBtn").style.display = "block";
                    }
                    else {
                        computerTurn();
                    }

                }
                else {
                    document.getElementById("warning").innerHTML = "Oops! Choose and empty space";
                }
            }
            else {
                document.getElementById("warning").innerHTML = "Oops! Not your turn";
                computerTurn();
            }
        }
        else {
            if (turnCnt % 2 == 0) {
                if (checkPlace(pos)) {
                    //clear warning
                    document.getElementById("warning").innerHTML = "";

                    document.getElementById(pos).innerHTML = "O";
                    turnCnt++;
                    if (checkWin()) {
                        //display player 1 win
                        document.getElementById("turn").innerHTML = "Player 1 Wins!";
                        //show again btn
                        document.getElementById("againBtn").style.display = "block";
                    }
                    else if (win == true) {
                        //display tie
                        document.getElementById("turn").innerHTML = "It's a Tie!";
                    }
                    else {
                        //display turn
                        document.getElementById("turn").innerHTML = "Player 2's Turn";
                    }
                }
                else {
                    document.getElementById("warning").innerHTML = "Oops! Choose and empty space";
                }
            }
            else {
                if (checkPlace(pos)) {
                    //clear warning
                    document.getElementById("warning").innerHTML = "";

                    document.getElementById(pos).innerHTML = "X";
                    turnCnt++;
                    if (checkWin()) {
                        //display player 2 win
                        document.getElementById("turn").innerHTML = "Player 2 Wins!";
                        //show again btn
                        document.getElementById("againBtn").style.display = "block";

                    }
                    else if (win == true) {
                        //display tie
                        document.getElementById("turn").innerHTML = "It's a Tie!";
                    }
                    else {
                        //display turn
                        document.getElementById("turn").innerHTML = "Player 1's Turn";
                    }
                }
                else {
                    document.getElementById("warning").innerHTML = "Oops! Choose and empty space";
                }
            }
        }

    }
}

function playAgain() {
    win = false;

    //clear content of all spaces
    document.getElementById('pos0').innerHTML = "";
    document.getElementById('pos1').innerHTML = "";
    document.getElementById('pos2').innerHTML = "";
    document.getElementById('pos3').innerHTML = "";
    document.getElementById('pos4').innerHTML = "";
    document.getElementById('pos5').innerHTML = "";
    document.getElementById('pos6').innerHTML = "";
    document.getElementById('pos7').innerHTML = "";
    document.getElementById('pos8').innerHTML = "";

    if (twoPlayer) {
        //display turn
        document.getElementById("turn").innerHTML = "Player 1's Turn";
    }
    else {
        //display your turn
        document.getElementById("turn").innerHTML = "Your Turn";
    }
    //clear warning
    document.getElementById("warning").innerHTML = "";

    //hide again btn
    document.getElementById("againBtn").style.display = "none";
}

function changeMode() {
    if (twoPlayer) {
        twoPlayer = false;
        document.getElementById("modeBtn").innerHTML = "2 Player Mode";
    }
    else {
        twoPlayer = true;
        document.getElementById("modeBtn").innerHTML = "1 Player Mode";
    }
    playAgain();
}