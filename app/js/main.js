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
					setTimeout(() => {popupSend.style.display = 'none'}, 5000);
				} else {
					response.json().then(data => {
						if(Object.hasOwn(data, 'errors')) {
							popup.innerHTML = data['errors'].map(error => error['message']).join(', ')
							setTimeout(() => {popup.innerHTML = ''}, 5000);
						} else {
							popup.innerHTML = "Oops! There was a problem submitting your form"
							setTimeout(() => {popup.innerHTML = ''}, 5000);
						}
					})
				}
			}).catch(error => {
				popup.innerHTML = "Oops! There was a problem submitting your form"
				setTimeout(() => {popup.innerHTML = ''}, 5000);
			});
		}
		form.addEventListener('submit', handleSubmit)
	}
}

formSend();