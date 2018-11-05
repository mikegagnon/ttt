var PLAYER = "X";

function cellClick() {
    $(this).text(PLAYER);

    if (PLAYER == "X") {
        PLAYER = "O";
    } else {
        PLAYER = "X";
    }
}

$(".cell").click(cellClick);