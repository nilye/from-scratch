function curry(fn){
	return function curried(){
		let args = Array.prototype.slice.call(arguments)
		if(args.length >= fn.length){
			return fn.apply(this, args)
		}
		return function(...args2){
			return curried.apply(this, args.concat(args2))
		}
	}
}


function sum (a, b, c){
	return a + b + c
}

const _sum = curry(sum)

console.log(_sum(1, 2, 3))
console.log(_sum(1)(2,3))
console.log(_sum(1)(2)(3))
