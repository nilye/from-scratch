function instanceOf(obj, _class){
	let proto = obj.__proto__
	_class = _class.prototype

	while (true){
		if (proto == null) return false
		if (proto == _class ) return true
		proto = proto.__proto__
	}
}


console.log(instanceOf(new Date, Date))
