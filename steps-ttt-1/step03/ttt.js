var PLAYER = "X";
var CELL_MARK = new Array(9);

function cellClick() {
    var cellNumber = $(this).data("cell-number");

    if (CELL_MARK[cellNumber]) {
        return;
    }

    CELL_MARK[cellNumber] = PLAYER;
    $(this).text(PLAYER);

    if (PLAYER == "X") {
        PLAYER = "O";
    } else {
        PLAYER = "X";
    }
}

$(".cell").click(cellClick);