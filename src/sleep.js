function sleep(time){
	let timeStamp = new Date().getTime()
	let end = timeStamp + time
	while (true){
		if (new Date().getTime() > end){
			return
		}
	}
}


console.log(1)
sleep(1000)
console.log(2)
