
var turnCnt = 0;

function checkTurn() {
    if (turnCnt % 2 == 0) {
        document.getElementById("turn") = "Your Turn";
        return;
    }
    else {
        document.getElementById("turn") = "Computer Turn";
        computerTurn();
    }
}

function checkWin() {

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
        }
        else{
            computerTurn();
        }
    }, 1000);



}

function userTurn(pos) {

    //display your turn
    document.getElementById("turn").innerHTML = "Your Turn";
    
    if (turnCnt % 2 == 0) {
        if (checkPlace(pos)) {
            document.getElementById(pos).innerHTML = "O";
            turnCnt++;
            checkWin();
            computerTurn();
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