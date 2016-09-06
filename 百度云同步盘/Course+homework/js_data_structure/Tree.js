function BSNode(value) {
	this.data = value;
	this.lchild = null;
	this.rchild = null;

	this.visited = false; // only for the purposes of non-recrusive DFS/BFS search. 
}

function BSTree(){
	this.root = null;
	//this.size = 0; 
}

BSTree.prototype.push = function(value) {
	if ( !this.root ) {
		this.root = new BSNode(value);
	}else{
		//pushNode(this.root, value);
		var current = this.root;
		var temp = current;

		while( temp ){
			current = temp;
			if (temp.data>value) {
				temp = temp.lchild;
			}else{
				temp = temp.rchild;
			}
		}
		if (current.data>value) 
			current.lchild = new BSNode(value);
		else
			current.rchild = new BSNode(value);

	}
	return this;
};
BSTree.prototype.createByArray = function(arr){
	for(var i of arr){
		this.push(i);
	}
	return this;
}




function contains(node,value){
	if ( !node ) {
		return false;
	}else if( node.data == value ) {
		return true;
	}else if (node.data > value) {
		return contains(node.lchild, value);
	}else{
		return contains(node.rchild, value);
	}	
}

BSTree.prototype.contains = function(value){
	if ( !this.root ) {
		throw Error('tree is empty!');
	}else if( this.root.data == value ){
		return true;
	}else{
		return contains(this.root, value);
	}
}




/*
2 ways of realization, I would recommend the inorder one
usage: i.e. 
function testfunc(){
	console.log(this.data)
}
do tree.traversePreOrder( testfunc, true );
*/
BSTree.prototype.execFunc = function(func, bind, node){
	if(bind)	func.call(node);
	else		func();
}


BSNode.prototype.traverseInOrderNode = function(foo, bind){
	if (this.lchild)
		this.lchild.traverseInOrderNode(foo, bind);
	
	if (bind && this)   foo.call(this); 
	else if( this ) 	foo(); 

	if (this.rchild)
		this.rchild.traverseInOrderNode(foo, bind);
}

BSTree.prototype.traverseInOrder = function(foo, bind){
	return this.root.traverseInOrderNode(foo,bind);
}


BSTree.prototype.traversePreOrder = function(foo, bind){
	function traversePreOrderNode(node){
		if ( !node ) { return false; }
		else{	
			if (bind)  foo.call(node);
		    else foo();
			//this.execFunc(foo, bind, node);

			traversePreOrderNode(node.lchild);
			traversePreOrderNode(node.rchild);
		}
	}
	return traversePreOrderNode(this.root);
}

BSTree.prototype.traversePostOrder = function(foo, bind){
	function traversePostOrderNode(node){
		if ( !node ) { return false; }
		else{	
			traversePostOrderNode(node.lchild);
			traversePostOrderNode(node.rchild);
			if (bind)  foo.call(node);
			else foo();
			//this.execFunc(foo, bind, node);
		}
	}
	return traversePostOrderNode(this.root);
}


/*use traverse we can do a lot of things here*/
BSTree.prototype.size = function(){
	var len = -1;
	function calSize(){
		return len++;
	}
	this.root.traverseInOrderNode(calSize, false);
	return len;
}








BSTree.prototype.DFSearch = function(func, bind){
	return this.traversePreOrder(func, bind);
}

BSTree.prototype.DFSNoRecurse = function(func, bind){
	//firstly need to set all nodes visited to be false
	function setVisitedFalse(){
		return this.visited = false;
	}
	this.traversePreOrder(setVisitedFalse,true);


	//then begin the algorithm
	var stack = []; //remember stack can just be implemented with push and pop
	var current = this.root;

	this.execFunc(func, bind, current);
	stack.push(current);
	current.visited = true;

	while( current && stack.length>0 ) {//not empty
		if(current.lchild && !current.lchild.visited) { /*how to mark if lchild is visited already*/
			current = current.lchild;
		}else if(current.rchild && !current.rchild.visited){
			current = current.rchild;
		}else{
			stack.pop();
			current = stack.pop();
		}
		if (current && !current.visited){ 
			this.execFunc(func, bind, current);
			current.visited = true;
		}
		stack.push(current);
		//console.log(current);
	}
}


BSTree.prototype.BFSNoRecurse = function(func, bind){
	//firstly need to set all nodes visited to be false
	function setVisitedFalse(){
		return this.visited = false;
	}
	this.traversePreOrder(setVisitedFalse,true);

	//then begin the algorithm
	var queue = []; //remember queue can just be implemented with push and shift
	var current = this.root;

	this.execFunc(func, bind, current);
	current.visited = true;
	var count=0;

//can't use while queue is empty to end the loop. 
//i.e. an unbalanced subtree of nodes 10, 11, 12 where 10 is the parent
	while( current && count<this.size() ){  
		if ( current.lchild && !current.lchild.visited ) {
			this.execFunc(func, bind, current.lchild);
			queue.push(current.lchild);
			current.lchild.visited = true;
			count++;
		}else if(current.rchild && !current.rchild.visited){
			this.execFunc(func, bind, current.rchild);
			queue.push(current.rchild);
			current.rchild.visited = true;
			count++;
		}else{
			current = queue.shift();
		}
		if ( !current.visited ) {
			queue.push(current);
			this.execFunc(func, bind, current);
			current.visited = true;
			count++;
		}
	}//while
}










