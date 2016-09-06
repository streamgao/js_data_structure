/*Created by Stream Gao at 09-04-2016*/

//1. detect a loop in a linkedlist
//Floyd's algorithm for cycle detection.
function detectLoop(list){
	if ( list._length<3 ) {
		return false;
	}else{
		var slowPointer = list.head;
			fastPointer = list.head.next;
		while( slowPointer && fastPointer && fastPointer.next ){
			if ( slowPointer==fastPointer ) {
				return true;
			}else{
				slowPointer = slowPointer.next;
				fastPointer = fastPointer.next.next;
			}
		}
		return false;
	}
}

//think about it
function findLoopStart(list){
    var slowPointer = list.head,
        fastPointer = list.head;
    
    while( slowPointer && fastPointer && fastPointer.next ){
    	if ( slowPointer == fastPointer ) {
    		slowPointer = list.head;
    		
    		while( slowPointer && fastPointer && (slowPointer != fastPointer) ){
    			slowPointer = slowPointer.next;
    			fastPointer = fastPointer.next;
    		}
    		return slowPointer;
		}else{
			slowPointer = slowPointer.next;
			fastPointer = fastPointer.next.next;
		}
    }
    return null;
}


function findLengthOfLoop(list){
	if ( detectLoop(list) ){
		var loopBegin = findLoopStart(list);
		var detect = loopBegin.next;
		var i = 0;
		while( detect!= loopBegin ){
			i++;
			detect = detect.next;
		}
		return i;
	}else
		return false;
}


//Write a function that will return true if a circular singly linked list has duplicate values
function ifLoopContainDuplicate(list){
	if ( detectLoop(list) ){
		var loopBegin = findLoopStart(list);
		var len = findLengthOfLoop(list);
		var detect = loopBegin.next;

		for (var i = 0; i < len; i++) {
			var duplicate = (function(x, value){
				var begin = loopBegin;
				for (var i = 0; i < x; i++) {
				 	if (begin.data == value) {
				 		return begin;
				 	}else{
				 		begin = begin.next;
				 	}
				}
				return null;
			})(i, detect.data);
			if ( duplicate ) {
				return true;
			}
			detect = detect.next;
		}
		return false;
	}else
		throw Error('does not contain a loop');
}











