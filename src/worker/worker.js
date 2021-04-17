console.log(this)

onmessage = function(e){
	console.log(e)
	setTimeout(() => {
		postMessage(new Date())
	}, 4000)

}
