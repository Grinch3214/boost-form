function formSend() {
	const form = document.querySelector('.gamers__form');
	const popup = document.querySelector('.gamers__popup');
	const popupSend = document.querySelector('.gamers__request');

	if(form) {
		async function handleSubmit(event) {
			event.preventDefault();
			let data = new FormData(event.target);

			fetch(event.target.action, {
				method: form.method,
				body: data,
				headers: {
					'Accept': 'application/json'
				}
			}).then(response => {
				if(response.ok) {
					popupSend.style.display = 'block';
					form.reset();
					setTimeout(() => {popupSend.style.display = 'none'}, 3000);
				} else {
					response.json().then(data => {
						if(Object.hasOwn(data, 'errors')) {
							popup.innerHTML = data['errors'].map(error => error['message']).join(', ')
							setTimeout(() => {popup.innerHTML = ''}, 3000);
						} else {
							popup.innerHTML = "Oops! There was a problem submitting your form"
							setTimeout(() => {popup.innerHTML = ''}, 3000);
						}
					})
				}
			}).catch(error => {
				popup.innerHTML = "Oops! There was a problem submitting your form"
				setTimeout(() => {popup.innerHTML = ''}, 3000);
			});
		}
		form.addEventListener('submit', handleSubmit)
	}
}

formSend();

(function() {
	const emailInput = document.querySelector('.gamers__form-email input');
	const checkboxInput = document.querySelector('.gamers__form-checked');
	const sendBtn = document.querySelector('.gamers__form-submit');


	const validateForm = () => {
		(checkboxInput.checked === true  && emailInput.value !== '')
			? sendBtn.disabled = false
			: sendBtn.disabled = true
	}

	checkboxInput.addEventListener('change', validateForm);
  emailInput.addEventListener('input', validateForm);
})();