// 在所有 sharedWorker 共享的 worker.js 中，
// 保存一个 data 变量，
// 用于存储多个 worker 共享的数据
let data = "连接成功";
// 必须提供一个名为 onconnect 的事件处理函数
// 每当一个页面中 new SharedWorker("worker.js") 时，
// 就会为新创建的 worker 绑定 onconnect 事件处理函数
onconnect = function(e) {
	// 获得当前连接上来的客户端对象
	let client = e.ports[0];
	client.postMessage(data);
	// 当当前对象收到消息时
	client.onmessage = function(e) {
		// 如果消息内容为空，
		// 说明该客户端想获取共享的数据 data
		if (e.data === "") {
			// 就给当前客户端发送 data 数据
			client.postMessage(data);
		} else {
			// 否则如果消息内容不为空，
			// 说明该客户端想要提供
			// 新的消息保存在共享的 data 中，
			// 供别人获取
			data = e.data;
		};
	};
};
