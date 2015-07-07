/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  // create a new Board that has all methods avail to it
  // loop through the empty board and toggle through the pieces onto it
  // while toggling, we must check to see if it has any conflicts!
    // if it doesn't then place (toggle) the piece at the current location.
  // var solution = undefined; 
  
  testBoard = new Board({n:n});

  for (var i = 0; i < n ; i++) { 
    for (var j = 0; j < n; j++) {
      if (!this.hasRowConflictAt(i) && !this.hasColConflictAt(j)) {
        testBoard.togglepiece(i, j);
        console.log('testBoard attributes: ', testBoard.attributes);
      }
    }
  };

  // for (var i = 0; i < chessBoard.length)


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  return testBoard.attributes;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  if (this.findNRooksSolution) {
    solutionCount++;
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


