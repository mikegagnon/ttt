class TttVizualizer {

    constructor() {
        this.divId = randomDivId();
        this.appendHtml();
        dragElement(this.divId);
    }

    appendHtml() {
        var innerHtml = `
            <button class="row">Copy</button>
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
            <div class="row"><br></div>`

        // TODO: clean this up
        var fullHtml = "<div id='" + this.divId + "' style='position: absolute';><div id='" + this.divId + "header' style=''>Drag me</div>" + innerHtml + "</div>";
        $("body").append(fullHtml);
    }

    markCell(cellNumber, player) {
        var selector = "#" + this.divId + " .cell";
        $(selector).eq(cellNumber).text(player);
    }
}


function attachClickHandler(ttt, viz) {
    var clickFunction = function() {
        var cellNumber = $(this).data("cell-number");
        var result = ttt.cellClick(cellNumber);

        // TODO: teach this type of boolean condition
        if (result) {
            viz.markCell(cellNumber, result.player);
            if (result.victory) {
                alert(result.player + " wins!");
            } else if (result.gameOver) {
                alert("Tie!");
            }
        }


    }

    var selector = "#" + viz.divId + " .cell";

    $(selector).click(clickFunction);
}

function attachCopyHandler(ttt, viz) {

    var clickFunction = function() {
        var newViz = new TttVizualizer();
        var newTtt = ttt.deepCopy();
        attachClickHandler(newTtt, newViz);
    }


    $("#" + viz.divId + " button").click(clickFunction);
}

class TicTacToe {

    constructor(firstPlayer) {
        this.player = firstPlayer;
        this.cellMark = new Array(9);
        this.gameOver = false;
        this.cellsPlayed = 0;
    }

    deepCopy() {
        var newTTT = new TicTacToe(undefined);
        for (var i = 0; i < this.cellMark.length; i++) {
            var player = this.cellMark[i];
            if (player) {
                newTTT.player = player;
                newTTT.cellClick(i);
            }
        }

        newTTT.player = this.player;
    }

    cellClick(cellNumber) {
        if (this.gameOver || this.cellMark[cellNumber] == "X" || this.cellMark[cellNumber] == "O") {
            return;
        }

        // TODO: teach operator precedence 
        this.cellsPlayed++;
        this.cellMark[cellNumber] = this.player;
        var victory = this.checkForVictory(this.player);
        this.gameOver = victory || this.cellsPlayed == 9;

        var player = this.player;
        if (this.player == "X") {
            this.player = "O";
        } else {
            this.player = "X";
        }

        return {
            gameOver: this.gameOver,
            victory: victory,
            player: player
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

function randomDivId() {
    return "d" + Math.floor(Math.random() * 99999999);
}

var newViz = new TttVizualizer();
var newTtt = new TicTacToe("X");
attachClickHandler(newTtt, newViz);

