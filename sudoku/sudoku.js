function isValidSudoku(board) {

    function isValidRow(row) {
      // input: row[]
      // output: boolean

      // keep track of the number of occurances in a row
        var numberCount = {
                       1:0,
                       2:0,
                       3:0,
                       4:0,
                       5:0,
                       6:0,
                       7:0,
                       8:0,
                       9:0,

        };

        for (var i = 0; i < row.length; i++) {
            if(row[i] !== '' || row[i] !== ' ') {
                numberCount[row[i]]++;

                if (numberCount[row[i]] > 1) {
                    return false;
                }
            }
        }

        return true;
    }

    function isValidCol(board, colNum) {
        // input: board[][], colNum (number 0:8)
        // output: boolean

        var col = [];

        for(var i = 0; i < 9; i++) {
            col.push(board[i][colNum]);
        }

        return isValidRow(col);

    }

    function isValidSquare(board, squareNum) {
        // input: board[][], squareNum (number 0:8)
        // output: boolean

        var squares = {
            0:[board[0][0],board[0][1],board[0][2],board[1][0],board[1][1],board[1][2],board[2][0],board[2][1],board[2][2],],
            1:[board[0][3],board[0][4],board[0][5],board[1][3],board[1][4],board[1][5],board[2][3],board[2][4],board[2][5],],
            2:[board[0][6],board[0][7],board[0][8],board[1][6],board[1][7],board[1][8],board[2][6],board[2][7],board[2][8],],
            3:[board[3][0],board[3][1],board[3][2],board[4][0],board[4][1],board[4][2],board[5][0],board[5][1],board[5][2],],
            4:[board[3][3],board[3][4],board[3][5],board[4][3],board[4][4],board[4][5],board[5][3],board[5][4],board[5][5],],
            5:[board[3][6],board[3][7],board[3][8],board[4][6],board[4][7],board[4][8],board[5][6],board[5][7],board[5][8],],
            6:[board[6][0],board[6][1],board[6][2],board[7][0],board[7][1],board[7][2],board[8][0],board[8][1],board[8][2],],
            7:[board[6][3],board[6][4],board[6][5],board[7][3],board[7][4],board[7][5],board[8][3],board[8][4],board[8][5],],
            8:[board[6][6],board[6][7],board[6][8],board[7][6],board[7][7],board[7][8],board[8][6],board[8][7],board[8][8],],
        }

        return isValidRow(squares[squareNum]);
    }

    for (var i = 0; i < 9; i++) {
        if (!isValidRow(board[i]) || !isValidCol(board, i) || !isValidSquare(board, i)) {
            return false;
        }
    }

    return true;
};

function solveSudoku(board) {

  function depthFirstSearch(row, col) {
    //recursive function that solves a sudoku board in-place
    //input (row, col): both integers
    //rtype: boolean -> true if possible to solve, false otherwise
    //google 'sudoku solver' for more info on Depth First Search algorithms

    if (row === 9) {
      //if we have reached the end of the board
      return true;
    }

    if (col === 9) {
      //if we have reached the end of a row
      return depthFirstSearch(row + 1, 0);
    }

    //if our current position is unoccupied
    if (board[row][col] === '') {
      for (let num = 1; num <= 9; num++) {
        //try placing all digits 1-9, only the allowed digits will be placed
        if (isValid(row, col, `${num}`)) {
          board[row][col] = `${num}`;
          //if there is a possible path that leads to a solved board by placing that tile
          if (depthFirstSearch(row, col + 1)) {
            //if the board is solved
            return true;
          }
          //if placing that tile takes us down a 'rabbit hole' where it is impossible to solve,
          //go back to what it was before
          board[row][col] = '';
        }
      }
    //if the current position has been places, move over to the right and
    } else {
      return depthFirstSearch(row, col + 1);
    }
    //if the current board is unsolvable
    return false;
  }

  function isValid(row, col, num) {
    //input: (row, col, num) -> all integers
    //rtype: boolean -> true if placing num at row,col is a valid move, false otherwise

    //check if the number is allowed in the specified row
    for (let rowIdx = 0; rowIdx < 9; rowIdx++) {
      if (board[rowIdx][col] === num) {
        return false;
      }
    }
    //check if the number is allowed in the specified column
    for (let colIdx = 0; colIdx < 9; colIdx++) {
      if (board[row][colIdx] === num) {
        return false;
      }
    }
    //check if the given num is allowed in its 'square'
    let squareRowStart = row - (row % 3);
    let squareColStart = col - (col % 3);

    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      for (let colIndex = 0; colIndex < 3; colIndex++) {
        if (board[squareRowStart + rowIndex][squareColStart + colIndex] === num) {
          return false;
        }
      }
    }
    return true;
  }

  return depthFirstSearch(0, 0);
};

$('#random').click(function(){
    var input = $('table tr input');
    //reset the current board
    for(let i = 0; i < 81; i++) {
        input[i]['value'] = '';
    }

    var puzzles = [
      '.82..316..948.723..........24.1...536.......795...8.24..........293.578..762..39.',
      '.519.278.4....6..972.....4596.5.3..1.........5..8.9.6419.....768..6....2.761.549.',
      '521.8.4674...5...8.63...92....8.6...35.....79...5.3....15...69.6...4...2294.6.183',
      '.381..9...4.5....7....68.....72.5.91..3...5..15.7.93..6..35...9.....4.13.2...1...',
      '1...9...5.4.1.5.9...97.43...58...17.2.......6.91...83...49.75...3.6.8.2.9...5...7',
      '..4.761...79..263..3.....7...52.19.............26.97...2.....1..13..846...6.372..',
      '.3..7.......36.7...6...589...5.4..2.38.....71.9..5.3...264.......3.821.4....1....',
      '.28...47.3...9...2.794.235...23..7...1.759.2...7..16...951.328.2...7...4.41...53.',
      '3.96.52.1.6.3...8...72..6..5..8..347.........694..3..8..6..47...4...7.9.8.39.65.4',
      '79.1.2.....5..3..6..3......8..3.94..3.......2..28.7..5......1.....4..3...4.7.5.28',
      '5.19..3..7....3.4...4..8.......9..7..4...5...6..4...2.3...2...8.8...4.....7....95',
      '85.....7.7..9.4....6.725....451.283...7...4...186.795....531.8....4.9..3.3.....91',
      '1653....4..21.7........4..2...8......81...45.3....9..8...6........9.27..7.6..3829',
      '.86.5.29.7..89...6.....7.....95.3.4.36.....58.5.4.61.....1.....6...45..1.18.3.57.',
      '9.4.863.56...7...9..2..51..8.6......24.....98......2.4..91..5..5...2...11.865.4.2',
      '7.26.83.9....7.......3.5...5.89.41.7.9.....3.2.78.14.5...7.6.......1....8.62.39.4',
      '.3..6..9.1.89...3.........6..9.2..57.8.........6.....4...2.8..5.....3...9.7..4.1.',
      '1.9.3.6...5......7..39.2.....2..65..7.......8..51..4..3..8.47.........4..1..5.8.9',
      '.3.9.2.1.1..8.73......6...954.618.72..15.46..26.739.546...7......43.5..6.7.2.6.4.',
      '34..9..17.29.8.63...1...9.....1.6...51.....63...2.5.....2...7...93.2.45.15..6..28',
      '9.5...1.7..173.9..4.......8....825.6..8...2..2.359....5.......2..215.4..7.9...3.5',
    ];

    var puzzleNum = Math.floor(Math.random() * 20);

    for(let i = 0; i < 81; i++) {
        if (puzzles[puzzleNum][i] !== '.') {
            input[i]['value'] = puzzles[puzzleNum][i];
        }
        input[i].disabled = true;
    }

});

$('#solve').click(function(){
  var input = $('table tr input');
  var board = [];
  var row = [];

  for(let i = 0; i < 81; i++) {
    if (!/^\d+$/.test(input[i]['value'])) {
      input[i]['value'] = '';
    }
    if((i+1) % 9 === 0) {
      row.push(input[i]['value']);
      board.push(row);
      row = [];
    } else {
      row.push(input[i]['value']);
    }
  }

  if (isValidSudoku(board)) {
    if(solveSudoku(board)) {

      for (let i = 0; i < 81; i++) {
        if (input[i]['value'] === '') {
          input[i]['value'] = board[Math.floor(i/9)][i % 9];
          input[i].disabled = true;
        }
      }
    }
  }
});

$('#reset').click(function(){

  var input = $('table tr input');
  for(let i = 0; i < 81; i++) {
      input[i]['value'] = '';
      input[i].disabled = false;
  }
  $('#solve').disabled = false;

});
