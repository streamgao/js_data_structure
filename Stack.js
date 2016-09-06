/*Created by Stream Gao at 09-04-2016*/

/*
Actually we don't need stack/queue in js 
because array in js has method of pop, push, shift and unshift...
*/

/*
var myStack = [];

//push
myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.push({name:"star",price:2});
myStack.push({name:"star2",price:3});
myStack.push({name:"star3",price:4});

//pop
myStack.pop(); //{name:"star3",price:4}
myStack.pop(); //{name:"star2",price:4})
myStack.pop(); //{name:"star",price:4}
myStack.pop(); //3


var myQueue = myStack;
myQueue.push(1);
myQueue.push(2);
myQueue.push(3);
myQueue.push({name:"star",price:2});
myQueue.push({name:"star2",price:3});
myQueue.push({name:"star3",price:4});

myQueue.shift(); //1
myQueue.unshift(12); //insert from the beginning
myQueue.shift(); //12
*/

//Priority Queue:
//use array.sort();

//for furher reading fo here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
//use case, number conversion. from decimal to hexadecimal
//notice that this function only works for <decimals 
function convert(num, cimal){
	var myStack = [];

	while( num ){
		myStack.push( num%cimal );
		num = Math.floor(num/cimal);
	}
	var output = ""; 
	while( myStack.length ){
		output += myStack.pop();
	}
	return output;
}
//comment: we don't need to do this actually. in js there is a powerful funciton called to String(#) 
//i.e.  var num = 15; num.toString(16) is E; 













