function flatten(arr){
	return arr.reduce((acc, cur) => {
		if (Array.isArray(cur)){
			acc = acc.concat(flatten(cur))
		} else {
			acc.push(cur)
		}
		return acc
	}, [])
}


console.log( flatten([[1, 2], 3, [[[4], 5]]]) )
