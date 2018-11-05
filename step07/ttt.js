class TicTacToe {

    constructor(firstPlayer) {
        this.divId = randomDivId();
        this.player = firstPlayer;
        this.cellMark = new Array(9);
        this.gameOver = false;

        this.appendHtml();
        this.attachClickHandler();
        this.attachCopyHandler();

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

        var fullHtml = "<div id='" + this.divId + "' style='position: absolute';><div id='" + this.divId + "header' style=''>Drag me</div>" + innerHtml + "</div>";
        $("body").append(fullHtml);
    }

    attachClickHandler() {
        var __this__ = this;
        var clickFunction = function() {
            var cellNumber = $(this).data("cell-number");
            __this__.cellClick(cellNumber);
        }

        var selector = "#" + this.divId + " .cell";

        $(selector).click(clickFunction);
    }

    attachCopyHandler() {
        var __this__ = this;
        $("#" + this.divId + " button").click(function() {
            __this__.deepCopy();
        });
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

        this.cellMark[cellNumber] = this.player;
        var selector = "#" + this.divId + " .cell";
        $(selector).eq(cellNumber).text(this.player);
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

function randomDivId() {
    return "d" + Math.floor(Math.random() * 99999999);
}

var ttt = new TicTacToe("X");
