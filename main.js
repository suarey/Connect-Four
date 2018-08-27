console.log("JS loaded.");

document.turn = "Player 1";

let container = document.getElementById('container');

container.addEventListener('click', function(e){
    e.target.innerText = "HI";
    // console.log(e.target.)
});

