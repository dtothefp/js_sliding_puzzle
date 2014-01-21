/*
***
***
** =SORTER
***
***
*/

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
  console.log("HI!!! I'm a Sorted Array", combinations);
  return combinations;
}