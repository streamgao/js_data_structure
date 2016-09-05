const ERROR = false;
const SUCCEED = true;

function Node(d){
	this.data = d;
	this.next = null;
}

function LinkedList(){
	this._length = 0;
	this.head = null;
	this.tail = null;
}


LinkedList.prototype.add = function(val){
	var n = new Node(val);

	if ( !this.head ) {
		this.head = n;
		this.tail = n; //not sure about this step
	}else{
		n.next = this.head;
		this.head = n;
	}
	this._length++;

	return n;
}


LinkedList.prototype.push = function(val){
	var n = new Node(val);
	if ( !this.tail ) {
		this.tail = n;
		this.head = n;
	}else{
		this.tail.next = n;
		this.tail = n;
	}
	this._length++;
	return n;
}


LinkedList.prototype.insert = function(val, pos){ //insert after the pos. 
	var n = new Node(val);
	if ( this._length<pos || pos<0 ) {
		return ERROR; //when error occurs
	}else if ( pos==0 ) { // if insert before the head, use add instead
		this.add(val);
	}else{
		var i=pos;
		var current = this.head;

		while( --i ){//insert after current
			current = current.next;
		}
		n.next = current.next;
		current.next = n;

		if ( pos==this._length ) { // if the last one, remember to change the tail
			this.tail = n;
		}

		this._length++;
		return n;
	}

}


LinkedList.prototype.searchByPos = function(pos){ //pos starts from 1. 1st node is the head
	if ( this._length<pos || pos<1 || this._length<1 ) {
		throw new Error('Failure: position wrong.');
		//return ERROR;
	}else{
		var current = this.head;
		var i = pos;
		while( --i && current.next ){
			current=current.next;
		}
		return current;
	}
}

LinkedList.prototype.deleteByPos = function(pos){//pos starts from 1. 1st node is the head
	if ( this._length<pos || pos<1 || this._length<1 ) {
		throw new Error('Failure: position wrong.');
		//return ERROR;
	}else{
		var current = this.head;
		var i = pos-1;
		while( --i && current.next ){
			current=current.next;
		}
		//delete current.next
		var temp = current.next; // this line can be delete depends on the situations
		if ( pos==this._length ) {
			this.tail = current;
		}
		current.next = current.next.next;
		delete temp;
		this._length--;

		return SUCCEED;
	}
}


LinkedList.prototype.searchByVal = function(val){
	if ( this._length>0 ) {
		var current = this.head;
		while( current.data!=val && current.next ){
			current = current.next;
		}
		if ( current.data==val ) {
			return current; //if find the node;
		}else{
			return ERROR;  //if not in the list
		}
	}else{
		return ERROR; // if empty list
	}
}


LinkedList.prototype.deleteByVal = function(val){
	if ( this._length<1 ) {
		return ERROR;
	}else{
		var current = this.head;
		if ( current.data==val ) {
			this.head = this.head.next;
			this._length--;
			return SUCCEED;
		}else{
			while( current.next && current.next.data!=val ){
				current = current.next;
			}
			if ( current.next.data==val ) { //delete current.next
				current.next = current.next.next;
				this._length--;
				return SUCCEED;
			}else{ //not found
				return ERROR;
			}
		}
	}//if length >= 1
}


LinkedList.prototype.createByArray = function(arr){
	for(var i of arr){
		this.add(i);
	}
	return this;
}


LinkedList.prototype.reverse = function(){
	if( this._length<2 ){
		return ERROR;
	}else{
		var current = this.head;
		var after = current.next;
		var pre = current;

		while( after ){ 
			pre = current;
			current = after; //move forward
			after = after.next;
			current.next = pre;
		}
		//exchange head and tail
		this.tail = this.head;
		this.tail.next = null;
		this.head = current;

		return this;
	}
}













/*------------------------Now Double Linked List!--------------------------*/
function DoubleNode(d){
	Node.call(this, d);
	this.pre=null;
	this.next = null;
}


function DoubleLinkedList(){
	LinkedList.call(this);
}


DoubleLinkedList.prototype.add = function(val){
	var n = new DoubleNode(val);

	if( !this.head ){
		this.head = n;
		this.tail = n;
	}else if (this._length==1) { //if length is one,
		this.head = n;
		this.tail.pre = this.head;
		this.head.next = this.tail;
	}else{
		n.next = this.head;
		this.head.pre = n;
		this.head = n;
	}

	this._length++;
	return this;
}


DoubleLinkedList.prototype.push = function(val){
	var n = new DoubleNode(val);

	if( !this.tail ){
		this.tail = n;
		this.head = n;
	}else if (this._length==1) {
		this.tail = n;
		this.tail.pre = this.head;
		this.head.next = this.tail;
	}else{
		n.pre = this.tail;
		this.tail.next = n;
		this.tail = n;
	}

	this._length++;
	return this;
}


DoubleLinkedList.prototype.createByArray = function(arr){
	// inheritent from the linkedlist
	LinkedList.prototype.createByArray.call(this,arr);
	// alternatively we can do: 
	// var bindNeedToInvoke = LinkedList.prototype.createByArray.bind(this);
	// bindNeedToInvoke(arr);
	return this;
}


DoubleLinkedList.prototype.delete = function(current){
	/*: pay attention, we must make sure that current pre/next is not null
		and ! you cannot do this:
		current.pre.next || this.head = current.next;
		current.next.pre || this.tail = current.pre;
	*/

	if ( current.pre ) //if not the head
		current.pre.next = current.next;
	else //if the deleted one is head
		this.head = current.next;

	if ( current.next ) 	
		current.next.pre = current.pre;
	else //if the deleted one is tail
		this.tail = current.pre;

	delete current;
	this._length--;

	return this;
}


DoubleLinkedList.prototype.deleteByPos = function(pos){
	if (this._length<pos || pos<1 || this._length<1) {
		throw new Error('Error: position not in valid range.');
	}else{
		if( pos <= Math.floor(this._length/2) ){
			var i = pos;
			var current = this.head;
			while( --i ){
				current = current.next;
			}
		}else{ // speed up! now you know the advantage of tail!
			var i = this._length - pos;
			var current = this.tail;
			while( --i ){
				current = current.pre;
			}
		}

		this.delete(current);
		return this;
	}
}


DoubleLinkedList.prototype.deleteByVal = function(val){
	if (this._length<1) return ERROR;
	else{
		var current = this.head;
		while(current.next && current.data!=val){
			current = current.next;
		}
		if (current.data==val) {
			this.delete(current);
			return this;
		}else
			return ERROR;
	}

}


DoubleLinkedList.prototype.reverse = function(){
	if (this._length<2) return ERROR;
	else{
		var current = this.head;
		var pre = current;
		var after = this.head.next;

		while(after){
			//must put pre, current and after in the right place before exchange pre&next
			pre = current;
			current = after;
			after = after.next;
			
			current.next = pre;
			current.pre = after;
		}

		//deal with head and tail
		//now current is the tail
		this.tail = this.head;
		this.tail.next = null;

		this.head = current;
		this.head.pre = null;

		return this;
	}
}















