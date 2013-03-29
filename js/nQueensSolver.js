var testForwardSlash = function(n) {
// 3, 7, 11, 15, 14, 13, 12
  // 3 = 0
  // 7, 2 = 1
  // 11, 6, 1 = 2
  // 15, 10, 5, 0 = 3
  // 14, 9, 4 = 4
  // 13, 8 = 3
  // 12 = 5
  var solution = new Array(n * n);
  var i;
  for(i = 0; i < n * n; i++) {
    solution[i] = true;
  };

  for(var i = 0; i < n * n; i++) {

    // Calculate the 'forward slash' slice index
    var sliceForwardSlash = -((i % n) - Math.floor(i / n) - n + 1);
    var temp = sliceForwardSlash - n + 1;

    // Get the up left most number of the slice
    var startIndex = temp <= 0 ? Math.abs(temp) : temp * n;
    // console.log(i, sliceForwardSlash, startIndex);

    // Safe spot to insert queen is found
    if(solution[i] === true) {
      var counter = 0;

      // Calculate max range of spaces to iterate over
      var maxIterations = sliceForwardSlash < n ? sliceForwardSlash : Math.abs((n * 2 - 2) - sliceForwardSlash);

      // Mark every space in the diagonal slice as false
      while(counter <= maxIterations) {
        solution[startIndex + counter * (n + 1)] = false;
        counter++;
      }

      // Since we marked the current spot as false, reset it back to true
      solution[i] = true;
    }
  }
  console.log(solution);
}

var testBackSlash = function(n) {
  var solution = new Array(n * n);
  var i;
  for(i = 0; i < n * n; i++) {
    solution[i] = true;
  };

  for(var i = 0; i < n * n; i++) {
    // 0, 4, 8, 12, 13, 14, 15
    // 0 = 0 
    // 1,4 = 1 
    // 8,5,2 = 2 
    // 12,9,6,3 = 3 
    // 13,10,7 = 4 (n*2-1)
    // 14,11 = 5 (n*3-1)
    // 15 = 6 (n*4-1)

    // Get the diagonal matrix slice index
    var sliceBackSlash = (i % n) + Math.floor(i / n);

    // Find the top right most number of the diagonal slice
    var startIndex = sliceBackSlash < n ? sliceBackSlash : n * (sliceBackSlash - n + 2) - 1;

    // If current spot is still true, add a new queen and set any 'backslash' diagonal pieces to false
    if(solution[i] === true) {
      var counter = 0;

      // Calculate max range of spaces to iterate over
      var maxIterations = sliceBackSlash < n ? sliceBackSlash : Math.abs((n * 2 - 2) - sliceBackSlash);
      while(counter <= maxIterations) {
        solution[startIndex + counter * (n - 1)] = false;
        counter++;
      }

      // Since we marked the current queen is false, reset it back to true
      solution[i] = true;
    }
  }

  var matrix = [];
  for(var i = 0; i < n * n; i+=n) {
    var max = i === 0 ? n : i + n;
    matrix.push(solution.slice(i, max));
  }

  solution = matrix;
  console.log(solution);
}

var solveNQueens = function(n){
  // var solution = [
  //   [false, true,  false, false],
  //   [false, false, false, true ],
  //   [true,  false, false, false],
  //   [false, false, true,  false]
  // ];

  // the above is a pre-baked solution for when n = 4.
  // Write code here that will find solutions for any n
  // hint: you'll want to start by building your own matrix to put in the solution variable
  var solution = new Array(n * n);
  var i;
  for(i = 0; i < n * n; i++) {
    solution[i] = true;
  };

  // Top left position will be position of the first queen
  for(i = 0; i < n * n; i++) {
    // If spot is free to add a queen
    if(solution[i] === true) {

      // **ROWS** Mark all pieces in the current row to false
      var currRowIndex = i === 0 ? 1 : (i / n) * n;
      var maxRowIndex = currRowIndex + n;
      while(currRowIndex < maxRowIndex) {
        solution[currRowIndex] = false;
        currRowIndex++;
      }

      // **COLUMNS** Mark all pieces in current column to false
      var currColIndex = (i % n) + n;
      while(currColIndex < n * n) {
        solution[currColIndex] = false;
        currColIndex += n;
      }

      // **BACKWARD SLASH** Mark all 'backward slash' diagonals false

      // Calculate slash index of diagonal (Max of n*2-1 slices)
      var sliceForwardSlash = -((i % n) - Math.floor(i / n) - n + 1);

      // Eliminate all 'backslash' diagonals
      var sliceBackSlash = (i % n) + Math.floor(i / n);

      // Find the top right most number of the diagonal slice
      var startIndex = sliceBackSlash < n ? sliceBackSlash : n * (sliceBackSlash - n + 2) - 1;

      // If current spot is still true, add a new queen and set any 'backslash' diagonal pieces to false
      var counter = 0;

      // Calculate max range of spaces to iterate over
      var maxIterations = sliceBackSlash < n ? sliceBackSlash : Math.abs((n * 2 - 2) - sliceBackSlash);
      while(counter <= maxIterations) {
        solution[startIndex + counter * (n - 1)] = false;
        counter++;
      }

      // **FORWARD SLASH** Calculate the 'forward slash' slice index
      var sliceForwardSlash = -((i % n) - Math.floor(i / n) - n + 1);
      var temp = sliceForwardSlash - n + 1;

      // Get the up left most number of the slice
      var startIndex = temp <= 0 ? Math.abs(temp) : temp * n;
      // console.log(i, sliceForwardSlash, startIndex);
      counter = 0;

      // Calculate max range of spaces to iterate over
      var maxIterations = sliceForwardSlash < n ? sliceForwardSlash : Math.abs((n * 2 - 2) - sliceForwardSlash);

      // Mark every space in the diagonal slice as false
      while(counter <= maxIterations) {
        solution[startIndex + counter * (n + 1)] = false;
        counter++;
      }

        // Since we marked the current spot as false, reset it back to true
        solution[i] = true;


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
  if(window.chessboardView) window.chessboardView.model.setSimpleBoard(solution);
  return solution;
}
