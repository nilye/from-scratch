Function.prototype._call = function (context = globalThis, ...args){
	const key = Symbol('_call')
	context[key] = this

	const res = context[key](...args)
	delete context[key]
	return res
}

function x(...args){
	console.log(this, ...args)
}

x._call({ context: null }, 1,2,3)
