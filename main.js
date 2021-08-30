//window load
window.addEventListener('load', () => {
	let long;
	let lat;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			long = position.coords.longitude;
			lat = position.coords.latitude;
			const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=761da6fb638e9a4416e8e25a80145f17`;
			fetch(api)
				.then((response) => response.json())
				.then((data) => displayResults(data));
		});
	}
});

//button load
const api = {
	key: '761da6fb638e9a4416e8e25a80145f17',
	base: 'https://api.openweathermap.org/data/2.5/',
};

const searchResult = () => {
	const searchField = document.getElementById('search-field');
	const searchFieldTxt = searchField.value;
	searchField.value = '';
	fetch(`${api.base}weather?q=${searchFieldTxt}&units=metric&APPID=${api.key}`)
		.then((weather) => weather.json())
		.then((data) => displayResultsNow(data));
};

const displayResults = (data) => {
	const location = document.getElementById('location');
	location.innerText = `${data.name}`;
	const temp = document.getElementById('temp');
	const temperatureValue = Math.round(`${data.main.temp - 273}`);
	temp.innerText = temperatureValue;
	const feels = document.getElementById('feels');
	const feelsValue = Math.round(`${data.main.feels_like - 273}`);
	feels.innerText = feelsValue;

	document.querySelector(
		'.icon'
	).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
	document.querySelector(
		'.description'
	).innerText = `${data.weather[0].description}`;

	let now = new Date();
	let date = document.getElementById('date');
	date.innerText = dateBuilder(now);
	// document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${data.name}')`;
	// document.body.style.backgroundImage.opacity = '0.5';
};

const displayResultsNow = (data) => {
	console.log(data);
	const location = document.getElementById('location');
	location.innerText = `${data.name}`;
	const temp = document.getElementById('temp');
	const temperatureValue = Math.round(`${data.main.temp}`);
	temp.innerText = temperatureValue;
	const feels = document.getElementById('feels');
	const feelsValue = Math.round(`${data.main.feels_like}`);
	feels.innerText = feelsValue;

	document.querySelector(
		'.icon'
	).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
	document.querySelector(
		'.description'
	).innerText = `${data.weather[0].description}`;

	let now = new Date();
	let date = document.getElementById('date');
	date.innerText = dateBuilder(now);
	// document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${data.name}')`;
	// document.body.style.backgroundImage.opacity = '0.5';
};
const dateBuilder = (d) => {
	let months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	let days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();
	return `${day} ${date} ${month} ${year}`;
};
