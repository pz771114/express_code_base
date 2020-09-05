const login = async (email, password)=>
{
	console.log(email, password)
	//axios return a promise
	try
	{
		const result = await axios({
		method: 'POST',
		url:'http://localhost:3000/users/login',
		data:{
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
document.querySelector('.login-form').addEventListener('submit', e=>{
	e.preventDefault()

	const email = document.getElementById('email').value
	const password = document.getElementById('password').value
	login(email,password)
})