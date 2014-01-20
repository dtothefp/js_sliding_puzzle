$(function(){
  console.log("LOADED");
  sortArr(sampleArr);

  var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  puzzle = new Puzzle();
  puzzle.initialize(arr);
});


/*
***
***
** =SORTER
***
***
*/

var sampleArr = ["zebra", 4, 2, 5, 3, "hello", "kitten", 1]

var sortArr = function(combinations) {
  var stringIndexes = [];
  var numberIndexes = [];
  var numbers = [];
  var strings = [];
  for( var i = 0; i < combinations.length; i++) {
    if ( typeof( combinations[i] ) === "string" ) {
      stringIndexes.push(i);
      strings.push( combinations[i] );
    } else {
      numberIndexes.push(i);
      numbers.push( combinations[i] );
    }
  }
  strings.sort();
  numbers.sort();
  for( var i = 0; i < stringIndexes.length; i++ ) {
    combinations[ stringIndexes[i] ] = strings[i];
  }  
  for( var i = 0; i < numberIndexes.length; i++ ) {
    combinations[ numberIndexes[i] ] = numbers[i];
  }  
  console.log(combinations);
  return combinations;
}

/*
***
***
** =PUZZLE
***
***
*/

var Puzzle = function() {
  this.board = [];
  this.cellCount = [];
}

var Cell = function(row, column, order, value, grid) {
  this.position = [row, column];
  this.order = order;
  this.value = value;
  this.$el = $("<div>").data("order", this.order).css({"width" : 100/grid + "%"}).text( value ).addClass("cells");
  console.log("value", value);
}

Puzzle.prototype.initialize = function(imageArr) {
    this.grid = Math.sqrt( imageArr.length + 1 );
    var row;
    var iterator = 0;
    _(this.grid).times(function(rowNumber) {
      row = [];
      // Create a row
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
    console.log("board", this.board);
    // this.shuffleBoard();
    this.makeBoard();
}

Puzzle.prototype.makeBoard = function() {
  var board = $("#board");
  var row, shuffled;
  var rowNumber = 0;
  var self = this;
  _.each(this.board, function(rowArr) {
    shuffled = _.shuffle(rowArr);
    row = $("<div>").addClass("row");
    for( var i = 0; i < shuffled.length; i++ ) {
      shuffled[i].checkNeighbor(self.board);
      shuffled[i].position = [rowNumber, i];
      // This could have potentially done bad things to the board???
      self.board[rowNumber][i] = shuffled[i];
      row.append( shuffled[i].$el );
      console.log("cell position", shuffled[i].position);
    }
    board.append(row);
    rowNumber ++;
  });
}

Cell.prototype.move = function(board) {
  var self = this;
  if ( this.value !== "placeholder" && this.checkNeighbor() ) {

  }
  this.$el.on("click", function(){
    console.log("hello");
  });
}

Puzzle.prototype.setPlaceholderPos = function() {
  var elementsArr = _.flatten(this.board);
  var self = this;
  _.each(elementsArr, function(element) {
    if ( element.value === "placeholder" ) {
      console.log("if statement", element.position);
      self.placeholderPos = element.position;
    }
  });
}

Cell.prototype.checkNeighbor = function(placeholderPos) {
  // if below, above, right, or left is "placeholder" then can trade places with placeholder
  var self = this;
  var positionAbove = [self.position[0] - 1, self.position[1]];
  var positionBelow = [self.position[0] + 1, self.position[1]];
  var positionLeft = [self.position[0], self.position[1] - 1];
  var positionRight = [self.position[0], self.position[1] + 1];
  this.$el.on("click", function() {
    console.log("hello");
  });
}

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}








