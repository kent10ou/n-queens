// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
        );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
        );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

    */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // compare the first row: first column to the first row : second column
      // if both are > 0, then return true
      // iteration: if the value of two or more items in the row is > 0 
      // if the index is greater than 0 AND 
      // debugger;
      var thisRow = this.attributes[rowIndex];
      var hasRowConflict = false;
      var tempVar = _.reduce(thisRow, function(a, b) {
        return a+b;
      }, 0)

      if (tempVar > 1) {
        hasRowConflict = true;
      }

      return hasRowConflict;
    },



    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var bool = false;
      for (var i = 0; i < this.attributes.n; i++) {
        if (this.hasRowConflictAt(i)) {
          bool = true;
        }
      }    
      return bool;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
  hasColConflictAt: function(colIndex) {
    var hasColConflict = false;
    // we'll loop through this.attributes' n arrays.
          // once we loop through each array, we want to loop within that array 
      // search for a particular index.
      // 
      //FOR EACH ARRAY, if the value at that index === the value at any OTHER array's index
    var tempArr = [];
    for (var i = 0; i < this.attributes.n; i++) {
      tempArr.push(this.attributes[i][colIndex])
    }

    // console.log('tempArr: ', tempArr);

    var reduction = _.reduce(tempArr, function (a, b) {
      return a+b;
    })

    if (reduction > 1) {
      hasColConflict = true;
    }  

    return hasColConflict;
  },


    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var bool = false;
      for (var i = 0; i < this.attributes.n; i++) {
        if (this.hasColConflictAt(i)) {
          bool = true;
        }
      }    
      return bool;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var majDiagBool = false;
      var tempArr = [];

      for (var i = 0; i < this.attributes.n; i++) {
        var value = this.attributes[i][majorDiagonalColumnIndexAtFirstRow+i]
        if (value === undefined) { 
        value = 0;
        }
        tempArr.push(value);
      }
      // console.log('tempArray: ', tempArr);
      var reduction = _.reduce(tempArr, function (a, b) {
        return a+b;
      });

      //if x condition is met then majDiagBool = true
      if (reduction > 1) {
        majDiagBool = true;
      };

      return majDiagBool; 
    },




    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var bool = false;
      var length = this.attributes.n;
      for (var i = -length; i < length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          bool = true;
        }
      }
      return bool;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var minDiagBool = false;
      var tempArr = [];

      for (var i = 0; i < this.attributes.n; i++) {
        var value = this.attributes[i][minorDiagonalColumnIndexAtFirstRow-i]
        if (value === undefined) { 
          value = 0;
        }
        tempArr.push(value);
      }
      // console.log('tempArray: ', tempArr);
      var reduction = _.reduce(tempArr, function (a, b) {
        return a+b;
      });

      //if x condition is met then majDiagBool = true
      if (reduction > 1) {
        minDiagBool = true;
      };

      return minDiagBool;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var bool = false;
      var length = this.attributes.n;
      for (var i = 2*length; i >= 0; i--) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          bool = true;
        }
      }
      return bool;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};

}());

// testBoard = new Board({n:5});
    // console.log('testBoard: ', testBoard);
    // console.log('changes: ', testBoard.attributes);

