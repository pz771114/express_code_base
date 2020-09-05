const register = async (name, email, password)=>
{
	console.log(name, email, password)
	//axios return a promise
	try
	{
		const result = await axios({
		method: 'POST',
		url:'http://localhost:3000/users/signup',
		data:{
				name,
				email,
				password
			}
		})

		console.log('result:', result)

	}catch(err)
	{
		console.error(err.response.data)
	}
	
}
document.querySelector('.signup-form').addEventListener('submit', e=>{
	e.preventDefault()

	const name = document.getElementById('name').value
	const email = document.getElementById('email').value
	const password = document.getElementById('password').value
	register(name,email,password)
})