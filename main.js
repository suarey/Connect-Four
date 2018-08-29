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
            checkHorizontally();
            return;
        }   
    } 
}

/*
 *  UTILITY FUNCTIONS
 */

// Figure out how to split array into 7 sub arrays
// Run a for loop each sub array to check if there is 4 in a row.

function chunkArray() {
    // Specified how big we wanted the chunks.
    let groupSize = 7;
    
    return state
        .map((item, i) => { 
            return i % groupSize === 0 ? state.slice(i, i + groupSize) : null; 
        })
        .filter(item => { return item; })

}

function checkHorizontally() {
    let chunkedArray = chunkArray();
    chunkedArray.forEach(function(row) {
        let count = 0; 
        row.forEach(function(element) {
            if (element === 1) {
                count++
            } else {
                count = 0;
            }

            if (count === 4) alert("Player 1 won");
        })
    })
    // for (let i = 0; i < chunkedArray.length; i++) {
    //     if (state[i] === 1) {
    //         count++; 
    //     } else {
    //         count = 0;
    //     }

    //     if (count === 4) {
    //         alert("Player 1 won");
    //         break;
    //     };

    // }
};

function winner() {
    // Write code here
    // winner should look at state and determine if there's a winner
    // if there are 4 in a row for P1 return 1; P2 return -1; else return 0
    if (state.length === 4) {
       return 1;
        
    } else if (state.length === 4) {
        return -1;
        
    } else {
        return 0;
    }

}

function render() {
    for (let i=0; i<state.length; i++) {
        if (state[i] !== 0) {
            boxes[i].classList.add(state[i] === 1 ? "red": "green"); 
        }
    }
}
