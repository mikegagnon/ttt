class TicTacToe {

    constructor(firstPlayer) {
        this.player = firstPlayer;
        this.cellMark = new Array(9);
        this.gameOver = false;
    }

    cellClick(cellNumber) {
        if (this.gameOver || this.cellMark[cellNumber] == "X" || this.cellMark[cellNumber] == "O") {
            return;
        }

        this.cellMark[cellNumber] = this.player;
        $(".cell").eq(cellNumber).text(this.player);
        this.gameOver = this.checkForVictory("X") || this.checkForVictory("O");


        if (this.gameOver) {
            alert(this.player + " wins!");
        }

        if (this.player == "X") {
            this.player = "O";
        } else {
            this.player = "X";
        }
    }

    checkForVictory(player) {
        return (this.cellMark[0] == player && this.cellMark[1] == player && this.cellMark[2] == player) ||
            (this.cellMark[3] == player && this.cellMark[4] == player && this.cellMark[5] == player) ||
            (this.cellMark[6] == player && this.cellMark[7] == player && this.cellMark[8] == player) ||
            (this.cellMark[0] == player && this.cellMark[3] == player && this.cellMark[6] == player) ||
            (this.cellMark[1] == player && this.cellMark[4] == player && this.cellMark[7] == player) ||
            (this.cellMark[2] == player && this.cellMark[5] == player && this.cellMark[8] == player) ||
            (this.cellMark[0] == player && this.cellMark[4] == player && this.cellMark[8] == player) ||
            (this.cellMark[6] == player && this.cellMark[4] == player && this.cellMark[2] == player);
    }
}

var ttt = new TicTacToe("X");

$(".cell").click(function() {
    var cellNumber = $(this).data("cell-number");
    ttt.cellClick(cellNumber);
});



