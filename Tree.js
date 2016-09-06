function BTNode(value) {
	this.data = value;
	this.lchild = null;
	this.rchild = null;
}

function BTTree(){
	this.root = null;
	//this.size = 0; 
}

BTTree.prototype.push = function(value) {
	if ( !this.root ) {
		this.root = new BTNode(value);
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
			current.lchild = new BTNode(value);
		else
			current.rchild = new BTNode(value);

	}
	return this;
};
BTTree.prototype.createByArray = function(arr){
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

BTTree.prototype.contains = function(value){
	if ( !this.root ) {
		throw Error('tree is empty!');
	}else if( this.root.data == value ){
		return true;
	}else{
		return contains(this.root, value);
	}
}




/*
usage: i.e. 
function testfunc(){
	console.log(this.data)
}
do tree.traversePreOrder( testfunc );
*/

BTNode.prototype.traverseInOrderNode = function(foo, bind){
	if (this.lchild)
		this.lchild.traverseInOrderNode(foo, bind);
	
	if (bind)	foo.call(this);
	else		foo();

	if (this.rchild)
		this.rchild.traverseInOrderNode(foo, bind);
}

BTTree.prototype.traverseInOrder = function(foo, bind){
	this.root.traverseInOrderNode(foo,bind);
}


BTTree.prototype.traversePreOrder = function(foo, bind){
	function traversePreOrderNode(node){
		if ( !node ) { return false; }
		else{	
			if (bind)  foo.call(node);
			else foo();

			traversePreOrderNode(node.lchild);
			traversePreOrderNode(node.rchild);
		}
	}
	return traversePreOrderNode(this.root, bind);
}

BTTree.prototype.traversePostOrder = function(foo, bind){
	function traversePostOrderNode(node){
		if ( !node ) { return false; }
		else{	
			traversePostOrderNode(node.lchild);
			traversePostOrderNode(node.rchild);

			if (bind)  foo.call(node);
			else foo();
		}
	}
	return traversePostOrderNode(this.root, bind);
}



/*use traverse we can do a lot of things here*/
BTTree.prototype.size = function(){
	var len = 0;
	function calSize(){
		console.log(len);
		return len++;
	}
	len = this.root.traverseInOrderNode(calSize, false);
	return len;
}

//anyway。。。呜呜呜，多return 了一个undefined不知道是怎么一回事



























