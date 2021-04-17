const input = [2,7,8,3,4,1,9,5,6]

function quickSort(nums, p, r){
	if (!p) p = 0
	if (!r) r = nums.length - 1
	if (p < r){
		let q = partition(nums, p, r)
		quickSort(nums, p, q - 1)
		quickSort(nums, q + 1, r)
	}
}

function partition(nums, p, r){
	let i = p - 1
	for (let j = p; j < r; j++){
		if (nums[j] <= nums[r]){
			i = i + 1
			nums[j] = [nums[i], nums[i] = nums[j]][0]
		}
	}
	nums[r] = [nums[i+1], nums[i+1] = nums[r] ][0]
	return i + 1
}

quickSort(input)
console.log(input)
