function middlewares(fns, initial, cb){
	const iter = gen(fns)
	let item = iter.next()

	function next(newValue){
		console.log('called')
		initial = newValue
		item = iter.next()
		if (!item.done){
			item.value(initial, next)
		} else {
			cb(initial)
		}
	}

	item.value(initial, next)
}

function* gen(fns){
	for (let f of fns){
		yield f
	}
}

const fn1 = (ctx,next)=>{
	setTimeout(() => {
		next({
			count: ctx.count+10
		})
	}, 100)
}

const fn2 = (ctx,next)=>{
	next({
		count: ctx.count*2
	})
}

const fn3 = (ctx,next)=>{
	next({
		count: ctx.count+30
	})
}

middlewares([fn1,fn2,fn3],{count: 8},res=>{
	console.log(res)
})
