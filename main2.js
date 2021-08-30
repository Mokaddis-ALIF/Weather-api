//Window load
let geocode = {
	reverseGeocode: function (latitude, longitude) {
		var api_key = '5e9434571d6c421d808ee3030c3f7e90';

		var api_url = 'https://api.opencagedata.com/geocode/v1/json';

		var request_url =
			api_url +
			'?' +
			'key=' +
			api_key +
			'&q=' +
			encodeURIComponent(latitude + ',' + longitude) +
			'&pretty=1' +
			'&no_annotations=1';

		// see full list of required and optional parameters:
		// https://opencagedata.com/api#forward

		var request = new XMLHttpRequest();
		request.open('GET', request_url, true);

		request.onload = function () {
			// see full list of possible response codes:
			// https://opencagedata.com/api#codes

			if (request.status === 200) {
				// Success!
				var data = JSON.parse(request.responseText);
				displayResultsNow(data.results[0].components);
				console.log(data.results[0].components.city); // print the location
			} else if (request.status <= 500) {
				// We reached our target server, but it returned an error

				console.log('unable to geocode! Response code: ' + request.status);
				var data = JSON.parse(request.responseText);
				console.log('error msg: ' + data.status.message);
			} else {
				console.log('server error');
			}
		};

		request.onerror = function () {
			// There was a connection error of some sort
			console.log('unable to connect to server');
		};

		request.send(); // make the request
	},
	getLocation: function () {
		function success(data) {
			geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
		}
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(success, console.error);
		} else {
			// weather.fetchWeather('Denver');
		}
	},
};
geocode.getLocation();
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
		.then((data) => displayResults(data));
};

const displayResults = (data) => {
	console.log(data.weather[0].icon);
	const location = document.getElementById('location');
	location.innerText = `${data.name},${data.sys.country}`;
	const temp = document.getElementById('temp');
	temp.innerText = `${data.main.temp}`;
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
	const location = document.getElementById('location');
	location.innerText = `${data.city},${data.country}`;
	// const temp = document.getElementById('temp');
	// temp.innerText = `${data.main.temp}`;

	let now = new Date();
	let date = document.getElementById('date');
	date.innerText = dateBuilder(now);
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
