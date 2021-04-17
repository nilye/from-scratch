function myNew(func){
	let obj = {}
	if (func.prototype){
		obj.__proto__ = func.prototype
	}

	let ret = func.apply(obj, Array.prototype.slice.call(arguments, 1))

	if ((typeof ret === 'object' || typeof ret === 'function') && ret != null){
		return ret
	}

	return obj
}


function A(x){
	this.x = x
}

console.log( myNew(A, 1))
