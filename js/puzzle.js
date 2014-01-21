/*
***
***
** =PUZZLE
***
***
*/

var Puzzle = function() {
  this.board = [];
}

var Cell = function(row, column, order, value) {
  this.position = [row, column];
  this.order = order;
  this.value = value;
  this.$el = $("<div>").data("order", this.order).text( value ).addClass("cells");
}

Puzzle.prototype.initialize = function(imageArr) {
    // Define the n x n grid
    this.grid = Math.sqrt( imageArr.length + 1 );
    var row;
    var iterator = 0;
    _(this.grid).times(function(rowNumber) {
      row = [];
      // Create row nested arrays in the board that contain instantiations of cells
      _(this.grid).times(function(columnNumber){
        if ( imageArr[iterator] ) {
          row.push( new Cell(rowNumber, columnNumber, iterator, imageArr[iterator], this.grid) );
        } else {
          row.push( new Cell(rowNumber, columnNumber, iterator, "placeholder", this.grid) );
        }
        iterator ++;
      }, this);
      // Push each new row into the board
      this.board.push( row );
    }, this);
    this.makeBoard();
}

Puzzle.prototype.makeBoard = function() {
  var row, shuffled;
  var rowNumber = 0;
  var self = this;
  _.each(this.board, function(rowArr) {
    // Shuffle elements in the individual rows
    shuffled = _.shuffle(rowArr);
    row = $("<div>").addClass("row");
    for( var i = 0; i < shuffled.length; i++ ) {
      // Set up the click listener conditions for moving the placeholder
      self.checkNeighbors(shuffled[i]);
      // Set the new shuffled position on the cell instantiation
      shuffled[i].position = [rowNumber, i];
      // Place the cell instantiation in the new shuffled position for the board
      self.board[rowNumber][i] = shuffled[i];
      // Create a placeholder for the instantiation element, and size it to a percentage based upon grid size
      var placeholderDiv = $("<div>")
                              .data({"row" : rowNumber, "column" : i})
                              .css({"width" : 100/self.grid + "%"})
                              .addClass("cell-placeholder")
                              .append( shuffled[i].$el );
      row.append(placeholderDiv);
    }
    $("#board").append(row);
    rowNumber ++;
  });
}

// Keep track of the placeholder element's position in the board attribute of the puzzle instantiation
Puzzle.prototype.setPlaceholderPos = function() {
  var elementsArr = _.flatten(this.board);
  var self = this;
  _.each(elementsArr, function(element) {
    if ( element.value === "placeholder" ) {
      self.placeholderPos = element.position;
      self.placeholder = element;
    }
  });
}

Puzzle.prototype.checkNeighbors = function(cell) {
  var self = this;
  // Set up conditions for how the cells move in relation to the placeholder i.e. only move is placeholder is above || below || left || right
  cell.$el.on("click", function() {
    self.setPlaceholderPos();
    var positionAbove = [cell.position[0] - 1, cell.position[1]];
    var positionBelow = [cell.position[0] + 1, cell.position[1]];
    var positionLeft = [cell.position[0], cell.position[1] - 1];
    var positionRight = [cell.position[0], cell.position[1] + 1];
    if ( arraysEqual(positionAbove, self.placeholderPos) ) {
        self.switchPositions(cell, self.placeholder);
    } else if ( arraysEqual(positionBelow, self.placeholderPos) ) {
        self.switchPositions(cell, self.placeholder);
    } else if ( arraysEqual(positionLeft, self.placeholderPos) ) {
        self.switchPositions(cell, self.placeholder);
    } else if ( arraysEqual(positionRight, self.placeholderPos) ) {
        self.switchPositions(cell, self.placeholder);
    }
    // Check the winning conditions
    self.checkWinner();
  });
}

Puzzle.prototype.switchPositions = function(chosen, placeholder) {
  var initialCellPosition = chosen.position;
  var initialPlaceholderPosition = placeholder.position;
  var placeholderParent = placeholder.$el.parent();
  var chosenParent = chosen.$el.parent();
  placeholder.$el.remove();
  chosen.$el.remove();
  $(placeholderParent).append(chosen.$el);
  $(chosenParent).append(placeholder.$el);
  // Update the board positions
  this.board[ chosen.position[0] ][ chosen.position[1] ] = placeholder;
  this.board[ placeholder.position[0] ][ placeholder.position[1] ] = chosen;
  // Update the positions within the cell instantiations
  chosen.position = initialPlaceholderPosition;
  placeholder.position = initialCellPosition;
  // Update the click listener
  this.checkNeighbors(chosen);
}

Puzzle.prototype.checkWinner = function() {
  // Flatten the board array and check if there is a difference of the value of 1 between each of it's elements
  var flattenedArr = _.flatten(this.board);
  var comparableArr = [];
  for( var i = 0; i < flattenedArr.length - 1; i++) {
    comparableArr.push(  flattenedArr[i + 1].order - flattenedArr[i].order);
  }
  var uniqArr = _.uniq(comparableArr);
  if ( uniqArr.length === 1 && uniqArr[0] === 1 ) {
    alert("You Have Won The Game!!!!");
  }
}

// Helper function for comparing positions
function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}








