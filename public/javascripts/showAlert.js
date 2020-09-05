export const hideAlert = ()=>{
	const el = document.querySelector('alert')
	if(el)
	{
		el.parentElement.removeChild(el)
	}
}

export const showAlert = ()=>{
	hideAlert()

	//show alert

	const markup =`<div class='alert alert-danger alert-${type}'>${msg}</div>`

	document.querySelector('body').insertAdjacentHTML('afterbegin', markup)

	window.timeout(hideAlert, 5000)
}