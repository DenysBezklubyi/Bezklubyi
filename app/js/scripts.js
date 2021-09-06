$(document).ready(function(){
	$('.slider').slick({
		arrows: false,
		dots: true,
	});
});








document.querySelector('.appoi__bnt').addEventListener('click' , () =>{
	let name = document.querySelector('.name').value;
	let emailAddres = document.querySelector('.mail-addres').value;
	let appoiService = document.querySelector('.appoi-service').value;
	let phoneNumber = document.querySelector('.phone-number').value;
	let data = document.querySelector('.data').value;
	let time = document .querySelector('.time').value;
	let yourNotes = document.querySelector('.your-notes').value;
	
	console.log(name);
	console.log(emailAddres);
	console.log(appoiService);
	console.log(phoneNumber);
	console.log(data);
	console.log(time);
	console.log(yourNotes);
})






document.querySelector('.contact__bnt').addEventListener('click', () =>{
	let contact = document.querySelector('.form__first-name').value;
	let mail = document.querySelector('.form__mail').value;
	let selectService = document.querySelector('.form__select-service').value;
	console.log(contact);
	console.log(mail);
	console.log(selectService);
})