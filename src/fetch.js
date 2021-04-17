function fetch(method, url, data){
	const xhr = new XMLHttpRequest()
	xhr.open(method, url, true)

	return new Promise((resolve, reject) => {
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4){
				if (xhr.status !== 200){
					reject(xhr.statusText)
				}
				resolve(xhr.responseText)
			}
		}
		xhr.send(data)
	})
}
