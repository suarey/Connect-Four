console.log("JS loaded.");

/*
 *  CONSTANTS, STATE and CACHED DOM ELEMENTS
 */

document.turn = "Player 1";
const container = document.getElementById('container');
const state = new Array(42).fill(0);
// const state = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1, 1, 1, -1, 0, 0, 0]
const boxes = document.querySelectorAll('.box');
const goBlank = document.getElementsByName('.reset');

function goBlank() {
   clearbox(i);

}


/*
 *  EVENT LISTENERS
 */

container.addEventListener('click', dropCircle);

/*
 *  UTILITY FUNCTIONS
 */

function dropCircle(evt) {
    if (evt.target.id === "container") return; 
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
 *  UTILITY FUNCTIONS AND WIN LOGIC FUNCTIONS
 */

function convertToMatrix(state) {
    return state
        .map((item, i) => { 
            return i % 7 === 0 ? state.slice(i, i + 7) : null; 
        })
        .filter(item => { return item; });

        
        
        
}

function checkHorizontally(state) {
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

            console.log(negCount);
            if (posCount === 4) return 1;
            if (negCount === 4) return -1;
        }
    }
    return 0;
}

function checkVertically(state) {
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

// function checkDiagnol() {
//     chunkedArray.forEach(function(diag) {
//         let count = 0; 
//         diag.forEach(function(element) {
//             if (element === 1) {
//                 count++
//             } else {
//                 count = 0;
//             }

//             if (count === 4) alert("Player 1 won");
//         })
// })
// }

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


