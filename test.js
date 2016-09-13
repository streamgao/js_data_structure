var t = new BSTree();
t.push(5);
t.createByArray([1,2,7,4,9,10,0,12,11,8,6]);

function func(){	console.log(this.data);	}

t.traverseInOrder(func, true);
t.traversePreOrder(func, true);
t.traversePostOrder(func, true);
t.size();

t.DFSNoRecurse(func, true);
t.BFSNoRecurse(func, true);


//linkedlist 
var list = new LinkedList();
list.createByArray([1,2,3,2,4,5,6,7,3,4]);
//LinkedList {_length: 10, head: Node, tail: Node}
