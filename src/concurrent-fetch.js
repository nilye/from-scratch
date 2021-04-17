function sendRequest(urls, max, callback){
	let pendings = 0
	let currentIndex =0
	while (pendings < max){

	}

	async function request(url){
		if (!url) return
		pendings ++
		await fetch(urls)
		pendings --
		request(urls[currentIndex + 1])
		if (pendings == 0) {
			callback()
		}
	}
}

function request(urls, limit, done) {
	return {
		cancel: () => {}
	};
};
