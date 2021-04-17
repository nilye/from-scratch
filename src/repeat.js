function repeat(fn, times, wait){
	return function(){
		let count = 0
		let interval = setInterval(() => {
			count++
			fn.apply(this, arguments)
			if (count === times){
				clearInterval(interval)
			}
		}, wait)
	}
}


function log(){
	console.log(new Date)
}

let _log = repeat(log, 10, 500)
_log()
