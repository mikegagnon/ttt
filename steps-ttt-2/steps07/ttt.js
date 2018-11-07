class TttVizualizer {

    constructor() {
        this.divId = randomDivId();
        this.appendHtml();
    }

    appendHtml() {
        var html = `
            <div id="${this.divId}">
                <button>Copy</button>
                <div class="row">
                  <div class="cell" data-cell-number="0"></div>
                  <div class="cell" data-cell-number="1"></div>
                  <div class="cell" data-cell-number="2"></div>
                </div>
                <div class="row">
                  <div class="cell" data-cell-number="3"></div>
                  <div class="cell" data-cell-number="4"></div>
                  <div class="cell" data-cell-number="5"></div>
                </div>
                <div class="row">
                  <div class="cell" data-cell-number="6"></div>
                  <div class="cell" data-cell-number="7"></div>
                  <div class="cell" data-cell-number="8"></div>
                </div>
            </div>
            <div class="row"><br><div>`
        $("body").append(html);
    }

    markCell(cellNumber, player) {
        var selector = `#${this.divId} .cell`;
        $(selector).eq(cellNumber).text(player);
    }

    markGame(ttt) {
        for (var i = 0; i < ttt.cellMark.length; i++) {
            var player = ttt.cellMark[i];
            if (player) {
                this.markCell(i, player);
            }
        }
    }
}

function randomDivId() {
    return "d" + Math.floor(Math.random() * 99999999);
}

class TicTacToe {

    constructor(firstPlayer) {
        this.player = firstPlayer;
        this.cellMark = new Array(9);
        this.gameOver = false;
        this.cellsPlayed = 0;
    }

    deepCopy() {
        var newTtt = new TicTacToe(this.player);
        for (var i = 0; i < this.cellMark.length; i++) {
            newTtt.cellMark[i] = this.cellMark[i];
        }
        newTtt.gameOver = this.gameOver;
        newTtt.cellsPlayed = this.cellsPlayed;
        return newTtt;
    }

    playCell(cellNumber) {
        if (this.gameOver || this.cellMark[cellNumber]) {
            return {
                validMove: false
            };
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
            validMove: true,
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

function cellClick(cellNumber, ttt, viz) {
    var result = ttt.playCell(cellNumber);
    console.log(cellNumber, result);

    if (result.validMove) {
        viz.markCell(cellNumber, result.player);
        if (result.victory) {
            alert(result.player + " wins!");
        } else if (result.tie) {
            alert("Tie!");
        }
    }
}

function createTicTacToe(original) {

    // TODO: factor out
    var startingPlayer = "X";

    var viz = new TttVizualizer();
    var ttt;

    if (original) {
        ttt = original.deepCopy();
        viz.markGame(ttt);
    } else {
        ttt = new TicTacToe(startingPlayer);
    }

    function cellClickWrapper() {
        var cellNumber = $(this).data("cell-number");
        cellClick(cellNumber, ttt, viz);
    }

    function createTicTacToeWrapper() {
        createTicTacToe(ttt);
    }

    var selector = `#${viz.divId} .cell`;
    $(selector).click(cellClickWrapper);

    selector = `#${viz.divId} button`;
    $(selector).click(createTicTacToeWrapper);
}

// TODO: teach missing arguments undefined
//var game = createTicTacToe("X");

createTicTacToe();

//cellClick(0, game.ttt, game.viz);
//cellClick(2, game.ttt, game.viz);



// Setup game 2
/*var viz2 = new TttVizualizer();
var ttt2 = ttt1.deepCopy();
function cellClick2() {
    var cellNumber = $(this).data("cell-number");
    cellClick(cellNumber, ttt2, viz2);
}
var selector = `#${viz2.divId} .cell`;
$(selector).click(cellClick2);
*/