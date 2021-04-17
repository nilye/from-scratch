new Promise((resolve, reject)=>{
	resolve(1)
})

const STATE_ENUM = {
	PENDING: 'pending',
	FULFILLED: 'fulfilled',
	REJECTED: 'rejected'
}

class Promise {

	constructor (fn){
		this.state = 'pending'
		this.value = undefined
		this.reason = undefined
		this.fullfilledCbs = []
		this.rejectedCbs = []
		fn((value)=>{
			resolvePromise(this, value)
		}, (reason)=>{
			rejectPromise(this, reason)
		})
	}


	then(onFulfilled, onRejected){
		const nextPromise = new Promise(() => {})
		if (this.state === STATE_ENUM.FULFILLED){

			if (!isFunction(onFulfilled)){
				return this
			}
			setTimeout(()=>{
				try {
					const x = onFulfilled(this.value)
					resolvePromise(nextPromise, x)
				} catch(err) {
					rejectPromise(nextPromise, err)
				}
			}, 0)
		}

		if (this.state === STATE_ENUM.REJECTED){

			if (!isFunction(onRejected)){
				return this
			}

			setTimeout(()=>{
				try {
					const x = onRejected(this.reason)
					resolvePromise(nextPromise, x)
				} catch(err) {
					rejectPromise(nextPromise, err)
				}
			}, 0)
		}

		if (this.state === STATE_ENUM.PENDING){
			this.fullfilledCbs.push(()=>{
				setTimeout(()=>{
					try {
						const x = onFulfilled(this.value)
						resolvePromise(nextPromise, x)
					} catch(err) {
						rejectPromise(nextPromise, err)
					}
				}, 0)
			})
			this.rejectedCbs.push(()=>{
				setTimeout(()=>{
					try {
						const x = onRejected(this.reason)
						resolvePromise(nextPromise, x)
					} catch(err) {
						rejectPromise(nextPromise, err)
					}
				}, 0)
			})
		}


		return nextPromise
	}

	// catch(onRejected){
	// 	if (this.state === STATE_ENUM.PENDING){
	// 		this.rejectedCbs.push(()=>{
	// 			setTimeout(()=>{
	// 				try {
	// 					const x = onRejected(this.reason)
	// 					resolvePromise(nextPromise, x)
	// 				} catch(err) {
	// 					rejectPromise(nextPromise, err)
	// 				}
	// 			}, 0)
	// 		})
	// 	}
	//
	// 	if (this.state === STATE_ENUM.REJECTED){
	//
	// 		if (!isFunction(onRejected)){
	// 			return this
	// 		}
	//
	// 		setTimeout(()=>{
	// 			try {
	// 				const x = onRejected(this.reason)
	// 				resolvePromise(nextPromise, x)
	// 			} catch(err) {
	// 				rejectPromise(nextPromise, err)
	// 			}
	// 		}, 0)
	// 	}
	// }
}

function isFunction(x){
	return typeof x === 'function'
}

function isPromise(x){
	return x instanceof Promise
}

function runCallbacks(cbs, value){
	cbs.forEach(cb => cb(value))
}

function fulfillPromise(promise, value){
	if (promise.state !== STATE_ENUM.PENDING){
		return;
	}
	promise.state = STATE_ENUM.FULFILLED
	promise.value = value
	runCallbacks(promise.fullfilledCbs, value)
}

function rejectPromise(promise, reason){
	if (promise.state !== STATE_ENUM.PENDING){
		return;
	}
	promise.state = STATE_ENUM.REJECTED
	promise.reason = reason
	runCallbacks(promise.rejectedCbs, reason)
}

// resolve promise via the value of x
function resolvePromise(promise, x){

	if (promise === x){
		rejectPromise(promise, new TypeError('same object'))
		return
	}

	if (isPromise(x)){
		if (x.state === STATE_ENUM.FULFILLED){
			fulfillPromise(promise, x.value)
			return
		}
		if (x.state === STATE_ENUM.REJECTED){
			rejectPromise(promise, x.reason)
			return
		}
		if (x.state === STATE_ENUM.PENDING){
			x.then(() => {
				fulfillPromise(promise, x.value)
			}, () => {
				rejectPromise(promise, x.reason)
			})
		}
		return
	}

	// x is thenable
	if ('then' in x){
		let then
		let called = false
		try {
			then = x.then
		} catch(err){
			rejectPromise(promise, err)
			return
		}
		if (isFunction(then)){
			try {
				x.then(y => {
					if (called) return
					called = true
					fulfillPromise(promise, y)
				}, (r) => {
					if (called) return
					called = true
					rejectPromise(promise, r)
				})
			} catch (err) {
				if (called) return
				called = true
				rejectPromise(promise, err)
			}
		}
	} else {
		fulfillPromise(promise, x)
	}
}
