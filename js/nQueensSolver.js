var solveNQueens = function(n){

  // Closure variable to track all possible solutions
  var solutions = [];

  /** Mark all entries in the current row to false **/
  var eliminateRow = function(board, index) {
    var currRowIndex = Math.floor(index / n) * n;
    var maxRowIndex = currRowIndex + n;
    while(currRowIndex < maxRowIndex) {
      board[currRowIndex] = false;
      currRowIndex++;
    }
    return board;
  };

  /** Mark all entries in the current column to false **/
  var eliminateColumn = function(board, index) {
    var currColIndex = (index % n) + n;
    while(currColIndex < n * n) {
      board[currColIndex] = false;
      currColIndex += n;
    }
    return board;
  };

  /** Mark all entries in the 'forward slash' diagonal to false **/
  var eliminateUpRightDiagonals = function(board, index) {
      // Eliminate all 'backslash' diagonals
      var sliceBackSlash = (index % n) + Math.floor(index / n);

      // Find the top right most number of the diagonal slice
      var startIndex = sliceBackSlash < n ? sliceBackSlash : n * (sliceBackSlash - n + 2) - 1;

      // If current spot is still true, add a new queen and set any 'backslash' diagonal pieces to false
      var counter = 0;

      // Calculate max range of spaces to iterate over
      var maxIterations = sliceBackSlash < n ? sliceBackSlash : Math.abs((n * 2 - 2) - sliceBackSlash);
      while(counter <= maxIterations) {
        board[startIndex + counter * (n - 1)] = false;
        counter++;
      }
      return board;
  };

  /** Mark all entries in the 'backslash' diagonal to false **/
  var eliminateUpLeftDiagonals = function(board, index) {
    var sliceForwardSlash = -((index % n) - Math.floor(index / n) - n + 1);
    var temp = sliceForwardSlash - n + 1;

    // Get the up left most number of the slice
    var startIndex = temp <= 0 ? Math.abs(temp) : temp * n;
    var counter = 0;

    // Calculate max range of spaces to iterate over
    var maxIterations = sliceForwardSlash < n ? sliceForwardSlash : Math.abs((n * 2 - 2) - sliceForwardSlash);

    // Mark every space in the diagonal slice as false
    while(counter <= maxIterations) {
      board[startIndex + counter * (n + 1)] = false;
      counter++;
    }
    return board;
  };

  /** Given an index, mark all available queen spots to false **/
  var eliminateAllSquares = function(board, index) {
    board = eliminateRow(board, index);
    board = eliminateColumn(board, index);
    board = eliminateUpLeftDiagonals(board, index);
    board = eliminateUpRightDiagonals(board, index);

    // Reset current index to true since it was overwritten with false
    board[index] = true;
    return board;
  };

  /** Recursive function call to iterate over entire board **/
  var recursiveNQueens = function(board, index, count) {

    // Return board if queen count reached
    if(count === n) {
      solutions.push(board);
      return;
    }

    // Current index is where last queen was placed, so increment index by 1
    index++;

    // Reached end of the board
    if(index >= n * n) return;

    // Loop through all open spots on the board
    while(index < n * n) {
      if(board[index] === true) {
        var boardCopy = board.slice(0);

        // Remove all unavailable squares
        boardCopy = eliminateAllSquares(boardCopy, index);

        // Have to copy count since it's shared across calls in this while loop
        var queenCount = count;
        var outputBoard = recursiveNQueens(boardCopy, index, ++queenCount);
      }
      index++;
    }
  };

  /* Unflatten the array to a matrix **/
  var arrayToMatrix = function(array) {
    // Convert flattened array back into a matrix
    var matrix = [];
    for(var i = 0; i < n * n; i+=n) {
      var max = i === 0 ? n : i + n;
      matrix.push(array.slice(i, max));
    }
    return matrix;
  };

  /***************/
  /**** MAIN ****/
  /**************/

  // Flattened array
  var solution = new Array(n * n);
  var i;
  for(i = 0; i < n * n; i++) {
    solution[i] = true;
  };

  for(var i = 0; i < n; i++) {
    var boardCopy = solution.slice(0);

    // Remove all unavailable squares
    boardCopy = eliminateAllSquares(boardCopy, i);
    var outputBoard = recursiveNQueens(boardCopy, i, 1);
  }

  // Render the first solution to the board
  solution = arrayToMatrix(solutions[0]);

  // this line hooks into the visualizer
  if(window.chessboardView) window.chessboardView.model.setSimpleBoard(solution.reverse());
  return solution;
}
