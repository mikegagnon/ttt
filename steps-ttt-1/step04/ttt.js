var PLAYER = "X";
var CELL_MARK = new Array(9);
var GAME_OVER;
var CELLS_PLAYED = 0;

function cellClick() {
    var cellNumber = $(this).data("cell-number");

    if (GAME_OVER || CELL_MARK[cellNumber] == "X" || CELL_MARK[cellNumber] == "O") {
        return;
    }

    CELL_MARK[cellNumber] = PLAYER;
    CELLS_PLAYED++;
    $(this).text(PLAYER);
    var victory = checkForVictory(PLAYER);
    var tie = CELLS_PLAYED == 9;
    GAME_OVER = victory || tie;

    if (victory) {
        alert(PLAYER + " wins!");
    } else if (tie) {
        alert("Tie!");
    }

    if (PLAYER == "X") {
        PLAYER = "O";
    } else {
        PLAYER = "X";
    }
}

function checkForVictory(player) {
    return (CELL_MARK[0] == player && CELL_MARK[1] == player && CELL_MARK[2] == player) ||
        (CELL_MARK[3] == player && CELL_MARK[4] == player && CELL_MARK[5] == player) ||
        (CELL_MARK[6] == player && CELL_MARK[7] == player && CELL_MARK[8] == player) ||
        (CELL_MARK[0] == player && CELL_MARK[3] == player && CELL_MARK[6] == player) ||
        (CELL_MARK[1] == player && CELL_MARK[4] == player && CELL_MARK[7] == player) ||
        (CELL_MARK[2] == player && CELL_MARK[5] == player && CELL_MARK[8] == player) ||
        (CELL_MARK[0] == player && CELL_MARK[4] == player && CELL_MARK[8] == player) ||
        (CELL_MARK[6] == player && CELL_MARK[4] == player && CELL_MARK[2] == player);
}

$(".cell").click(cellClick);