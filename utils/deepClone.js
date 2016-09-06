function type(obj) {
	var toString = Object.prototype.toString;
	var map = {
	    '[object Boolean]'  : 'boolean',
	    '[object Number]'   : 'number',
	    '[object String]'   : 'string',
	    '[object Function]' : 'function',
	    '[object Array]'    : 'array',
	    '[object Date]'     : 'date',
	    '[object RegExp]'   : 'regExp',
	    '[object Undefined]': 'undefined',
	    '[object Null]'     : 'null',
	    '[object Object]'   : 'object'
	};
	if(obj instanceof Element) {
	        return 'element';
	}
	return map[toString.call(obj)];
}



function deepClone(data) {
	var t = type(data), o, i, ni;
	if(t === 'array') {
	    o = [];
	}else if( t === 'object') {
	    o = {};
	}else {
	    return data;
	}
	if(t === 'array') {
	    for (i = 0, ni = data.length; i < ni; i++) {
	        o.push(deepClone(data[i]));
	    }
	    return o;
	}else if( t === 'object') {
	    for( i in data) {
	        o[i] = deepClone(data[i]);
	    }
	    return o;
	}
}


/*
jquery:
var x = {
    a: 1,
    b: { f: { g: 1 } },
    c: [ 1, 2, 3 ]
};

var y = $.extend({}, x),          //shallow copy
    z = $.extend(true, {}, x);    //deep copy

y.b.f === x.b.f       // true
z.b.f === x.b.f       // false


jquery dom element:
.clone()
$( ".hello" ).clone().appendTo( ".goodbye" );
*/




