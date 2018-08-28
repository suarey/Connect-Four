console.log("JS loaded.");

/*
 *  CONSTANTS, STATE and CACHED DOM ELEMENTS
 */

document.turn = "Player 1";
const container = document.getElementById('container');
const state = new Array(42).fill(0);
const boxes = document.querySelectorAll('.box');

/*
 *  EVENT LISTENERS
 */

container.addEventListener('click', dropCircle);

/*
 *  UTILITY FUNCTIONS
 */

function dropCircle(evt) {
    let column = evt.target.classList[1].split("-")[1];
    let colBottomIdx = 35 + column;
    for (var start=colBottomIdx; start>=0; start-=7) {
        if (state[start] === 0) {
            state[start] = document.turn === "Player 1" ? 1 : -1;
            document.turn = document.turn === "Player 1" ? "Player 2" : "Player 1";
            render();
            return;
        }   
    } 
}

/*
 *  UTILITY FUNCTIONS
 */

function winner() {
    // Write code here
    // winner should look at state and determine if there's a winner
    // if there are 4 in a row for P1 return 1; P2 return -1; else return 0
    if () {
        
    } else if {

    } else {

    }

}

function render() {
    for (let i=0; i<state.length; i++) {
        if (state[i] !== 0) {
            boxes[i].classList.add(state[i] === 1 ? "red": "green"); 
        }
    }
}
