/*
Linkedlist relevant interview questions and answers
Created by Stream Gao at 09-04-2016
*/

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



//remove duplicates in a linkedlist without additional buffer -- O(N2) 
function duplicateRemovalNoBuffer(list){
	var detect = list.head.next || null;
	var beforeDetect = list.head;

	while( detect ){
		var newCur = list.head;

		//stop until detect a duplicate. note that you need to check newCur first
		while( (newCur) && (detect.data != newCur.data) && (detect != newCur)) {
			newCur = newCur.next;
		}
		if ( (newCur) && (detect.data == newCur.data) && (detect != newCur))  {
			//if duplicate, remove detect
			beforeDetect.next = detect.next;
			list._length--;
		}else{
			beforeDetect = detect;	
		}
		detect = detect.next;
	}
	return list;
}



//remove duplicates in a linkedlist with additional buffer -- O(N) 
//use hash
function duplicateRemovalHash(list){
	if (list.head) {
		var detect = list.head.next || null,
			beforeDetect = list.head,
			hash = {};
		hash[list.head.data] = 1;
		while(detect){
			if ( !hash[detect.data] ) { //if no key
				hash[detect.data] = 1;
				beforeDetect = detect;
			}else{
				//if duplicate, remove the detect
				beforeDetect.next = detect.next;
				list._length--;
			}
			detect = detect.next;
		}	
	}
	return list;
}











