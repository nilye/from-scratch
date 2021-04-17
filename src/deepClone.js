// X 1. deep clone (recursion)
// x 2. Array
// X 3. Symobl
//   4. Circular reference

function deepClone(obj, hash = new WeakMap()){
	let cloned = Array.isArray(obj) ? [] : {}
	if (hash.has(obj)) return hash.get(obj)
	hash.set(obj, cloned)

	const keys = Reflect.ownKeys(obj)
	for (let k of keys){
		let v = obj[k]
		cloned[k] = isObject(v) ? deepClone(v, hash) : obj[k]

	}
	return cloned
}

function isObject(obj){
	return !!obj && Object.prototype.toString.call(obj) === "[object Object]"
}


let y = {x:1}
y[Symbol.for('a')] = 2
y.y = y
console.log(y)
let z = deepClone(y)
console.log('z', z)

