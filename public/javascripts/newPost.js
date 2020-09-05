const createNewPost = (title, content)=>{
	console.log(title, content)
		const result = axios({
			method:'POST',
			url:'http://localhost:3000/posts',
			data:{
				title,
				content
			}
		})

		result.then((data)=>{
			console.log(data)
		},(err)=>{
			console.error(err)
		})
}

document.querySelector('.new_post-form').addEventListener('submit', function(e){
	e.preventDefault()
	const title = document.getElementById('title').value
	const content = document.getElementById('content').value

	createNewPost(title, content)
})