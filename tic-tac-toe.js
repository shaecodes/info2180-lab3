document.addEventListener("DOMContentLoaded", function() {
    let board = document.getElementById("board");
    let divs = board.querySelectorAll("div");

    divs.forEach(function(div) {
        div.classList.add("square");
    });
});