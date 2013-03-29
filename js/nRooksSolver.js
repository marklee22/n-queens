var solveNRooks = function(n){

  // var solution = [
  //   [false, false, false, false],
  //   [false, false, false, false],
  //   [false, false, false, false],
  //   [false, false, false, true]
  // ];

  // the above is a pre-baked solution for when n = 4.
  // Write code here that will find solutions for any n
  // hint: you'll want to start by building your own matrix to put in the solution variable

  // Flattened board converted into an array and initialize all values to true
  var solution = new Array(n * n);
  var i;
  for(i = 0; i < n * n; i++) {
    solution[i] = true;
  };

  // Top left position will be position of the first rook
  for(i = 0; i < n * n; i++) {
    // If rook is present
    if(solution[i] === true) {

      // Mark all pieces in the current row to false
      var currRowIndex = i === 0 ? 1 : (i / n) * n;
      var maxRowIndex = currRowIndex + n;
      while(currRowIndex < maxRowIndex) {
        solution[currRowIndex] = false;
        currRowIndex++;
      }

      // Mark all pieces in current column to false
      var currColIndex = (i % n) + n;
      while(currColIndex < n * n) {
        solution[currColIndex] = false;
        currColIndex += n;
      }

      // Reset the current board position to true
      solution[i] = true;
    }
  }

  // Convert flattened array back into a matrix
  var matrix = [];
  for(var i = 0; i < n * n; i+=n) {
    var max = i === 0 ? n : i + n;
    matrix.push(solution.slice(i, max));
  }

  solution = matrix;

  // this line hooks into the visualizer
  if(window.chessboardView) window.chessboardView.model.setSimpleBoard(solution.reverse());
  return solution;
}
