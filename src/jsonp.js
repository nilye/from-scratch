
function fn({ip}) {
	console.log(ip); //
}
function jsonp(cb, domain) {
	const script = document.createElement('script');
	script.src = `https://api.asilu.com/ip/?callback=${cb}&ip=${domain}`;
	document.querySelector('head').appendChild(script);
}

// 获取百度IP
jsonp('fn', 'www.baidu.com');

