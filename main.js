/*
 *  CONSTANTS, STATE and CACHED DOM ELEMENTS
 */

document.turn = "Player 1";
const container = document.getElementById('container');
const state = new Array(42).fill(0);
const boxes = document.querySelectorAll('.box');
const gameStatus = document.querySelector('#game-status');
const restart = document.querySelector('#restart');
let gameWinner = false;

/*
 *  EVENT LISTENERS
 */

container.addEventListener('click', dropCircle);

restart.addEventListener('click', function() {
    state.forEach((item, idx) => state[idx] = 0);
    gameWinner = false;
    render();
})

/*
 *  UTILITY FUNCTIONS
 */

function dropCircle(evt) {
   
    if (gameWinner) return;
    if (evt.target.id === "container") return; 
    let column = evt.target.classList[1].split("-")[1];
    let colBottomIdx = 35 + column;
    for (var start=colBottomIdx; start>=0; start-=7) {
        if (state[start] === 0) {
            state[start] = document.turn === "Player 1" ? 1 : -1;
            if (winner()) {
                render();
                gameStatus.innerText = winner() === 1 ? "Player 1's Wins" : "Player 2 Wins";
                return;
            }
            document.turn = document.turn === "Player 1" ? "Player 2" : "Player 1";
            render();
            return;
        }   
    } 
}

/*
 *  UTILITY FUNCTIONS AND WIN LOGIC FUNCTIONS
 */

function convertToMatrix() {
    return state
        .map((item, i) => { 
            return i % 7 === 0 ? state.slice(i, i + 7) : null; 
        })
        .filter(item => { return item; });
}

function checkHorizontally() {
    let matrix = convertToMatrix(state);
    for (let i=0; i<matrix.length; i++) {
        let row = matrix[i];
        let posCount = 0; 
        let negCount = 0;
        for (let col=0; col<row.length; col++) {
            
            let element = row[col];
            
            if (element === 1) {
                negCount = 0;
                posCount++;
            } else if (element === -1) {
                posCount = 0;
                negCount++;
            } else {
                posCount = 0; 
                negCount = 0; 
            }

            if (posCount === 4) return 1;
            if (negCount === 4) return -1;
        }
    }
    return 0;
}

function checkVertically() {
    let matrix = convertToMatrix(state);
    for (let col=0; col<7; col++) {
        let posCount = 0; 
        let negCount = 0;
        for (let row=0; row<6; row++) {
            
            let element = matrix[row][col];
            
            if (element === 1) {
                negCount = 0;
                posCount++;
            } else if (element === -1) {
                posCount = 0;
                negCount++;
            } else {
                posCount = 0; 
                negCount = 0; 
            }

            if (posCount === 4) return 1;
            if (negCount === 4) return -1;
        }
    }
    return 0;
}

function checkUpperRightDiagnol() {
    let matrix = convertToMatrix(state);
    for (var col = 0; col < 4; col++) {
        for (var row = 5; row > 2; row--) {
            if (matrix[row][col] && matrix[row][col] === matrix[row-1][col+1] && matrix[row-1][col+1] === matrix[row-2][col+2] && matrix[row-2][col+2] === matrix[row-3][col+3]) {
                return matrix[row][col];
            }
        }
    }
    return 0;
}

function checkUpperLeftDiagnol() {
    let matrix = convertToMatrix(state);
    for (var col = 6; col > 2; col--) {
        for (var row = 5; row > 2; row--) {
            if (matrix[row][col] && matrix[row][col] === matrix[row-1][col-1] && matrix[row-1][col-1] === matrix[row-2][col-2] && matrix[row-2][col-2] === matrix[row-3][col-3]) {
                return matrix[row][col];
            }
        }
    }
    return 0;
}

function winner() {
    if (Math.abs(checkHorizontally()) === 1) {
        return checkHorizontally()
    }
    if (Math.abs(checkVertically()) === 1) {
        return checkVertically()
    }
    if (Math.abs(checkUpperRightDiagnol()) === 1) {
        return checkUpperRightDiagnol()
    }
    if (Math.abs(checkUpperLeftDiagnol()) === 1) {
        return checkUpperLeftDiagnol()
    }
    return 0;
}

function render() {

    for (let i=0; i<state.length; i++) {
        let currentDomNode = boxes[i];
        if (state[i] !== 0) {
            currentDomNode.classList.add(state[i] === 1 ? "red": "green"); 
        } else {
            if (currentDomNode.classList[2] === "red") {
                currentDomNode.classList.remove("red");
            }
            if (currentDomNode.classList[2] === "green") {
                currentDomNode.classList.remove("green");
            }
        }

        if (winner()) {
            gameWinner = true;
        }

    }
    gameStatus.innerText = document.turn + "'s Turn";
}


