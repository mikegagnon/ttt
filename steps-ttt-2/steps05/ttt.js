class TicTacToe {

    constructor(firstPlayer) {
        this.player = firstPlayer;
        this.cellMark = new Array(9);
        this.gameOver = false;
        this.cellsPlayed = 0;
    }

    playCell(cellNumber) {
        if (this.gameOver || this.cellMark[cellNumber]) {
            return;
        }

        this.cellMark[cellNumber] = this.player;
        this.cellsPlayed++;

        var victory = this.checkForVictory(this.player);
        var tie = !victory && this.cellsPlayed == 9;

        var player = this.player;
        if (this.player == "X") {
            this.player = "O";
        } else {
            this.player = "X";
        }

        return {
            player: player,
            victory: victory,
            tie: tie
        };
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

function cellClick() {
    var cellNumber = $(this).data("cell-number");
    var result = ttt.playCell(cellNumber);

    if (result) {
        $(this).text(result.player);
        if (result.victory) {
            alert(result.player + " wins!");
        } else if (result.tie) {
            alert("Tie!");
        }
    }
}

$(".cell").click(cellClick);
