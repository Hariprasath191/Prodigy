// Select the grid container
const grid = document.getElementById("sudoku-grid");
const solveBtn = document.getElementById("solve-btn");
const clearBtn = document.getElementById("clear-btn");

// Create a 9x9 Sudoku grid
for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = "1";
        input.dataset.row = row;
        input.dataset.col = col;
        grid.appendChild(input);
    }
}

// Solve Sudoku using backtracking
function isSafe(board, row, col, num) {
    // Check if num is not in the current row, column, and 3x3 sub-grid
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) return false;
    }

    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) return false;
        }
    }

    return true;
}

function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) return true;
                        board[row][col] = 0; // Backtrack
                    }
                }
                return false; // No solution exists
            }
        }
    }
    return true;
}

// Read input and solve
solveBtn.addEventListener("click", () => {
    const board = [];
    let isValid = true;

    // Read inputs into a 2D array
    for (let row = 0; row < 9; row++) {
        const currentRow = [];
        for (let col = 0; col < 9; col++) {
            const value = grid.querySelector(`input[data-row="${row}"][data-col="${col}"]`).value;
            if (value === "") {
                currentRow.push(0);
            } else if (!isNaN(value) && value >= 1 && value <= 9) {
                currentRow.push(parseInt(value));
            } else {
                isValid = false;
                break;
            }
        }
        if (!isValid) break;
        board.push(currentRow);
    }

    if (!isValid) {
        alert("Please enter valid numbers (1-9) or leave blank spaces.");
        return;
    }

    if (solveSudoku(board)) {
        // Display the solution
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                grid.querySelector(`input[data-row="${row}"][data-col="${col}"]`).value = board[row][col];
            }
        }
    } else {
        alert("No solution exists for the given Sudoku puzzle.");
    }
});

// Clear the grid
clearBtn.addEventListener("click", () => {
    grid.querySelectorAll("input").forEach(input => (input.value = ""));
});
