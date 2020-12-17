const key = 'j7Ek11xfTcE2ugN1xo8iEwdrZXOnTsSQVPwQjYoY'
var id = "";
var data = "";


const ListenToToggle = function () {
	btnForward = document.querySelector(`.js-toggle-forward`);
	btnBack = document.querySelector(`.js-toggle-back`);
	btnHome = document.querySelector(`.js-toggle-Home`);
	btnDetail = document.querySelector(`.c-astroid-detail`);

	

	btnForward.addEventListener('click', function () {
		var newUrl = window.location.origin;
		console.log(window.location)
		newUrl += window.location.pathname;
		newUrl += `?id=${parseInt(id) + 1}`
		
		setTimeout(function(){window.location.href = newUrl}, 1500);

	})

	btnBack.addEventListener('click', function () {
		var newUrl = window.location.origin;
		newUrl += window.location.pathname;
		newUrl += `?id=${parseInt(id) - 1}`

		setTimeout(function(){window.location.href = newUrl}, 1500);

	})

	btnHome.addEventListener('click', function () {
		// var url = window.location.href.split("?")[0]
		// url = url.replace("detail","index")
		// setTimeout(function(){window.location.href = url}, 1500);

		const overflow = document.querySelector(`.spaceImgdetail`);
		const detail = document.querySelector(`.c-table-detail`);
		const overview = document.querySelector(`.c-table-overview`);

		setTimeout(function(){
			detail.classList.add("c-table--visible");
			overflow.classList.add("spaceimg-Overflow");
			overview.classList.remove("c-table--visible");
		}, 1500);
		// detail.classList.add("c-table--visible");
		// overflow.classList.add("spaceimg-Overflow");
		// overview.classList.remove("c-table--visible");

	})

	btnDetail.addEventListener('click', function () {
		// var url = window.location.href.split("?")[0]
		// url = url.replace("detail","index")
		// setTimeout(function(){window.location.href = url}, 1500);

		const overflow = document.querySelector(`.spaceImgdetail`);
		const detail = document.querySelector(`.c-table-detail`);
		const test = document.querySelector(`.c-table-overview `);

		detail.classList.remove("c-table--visible");
		test.classList.add("c-table--visible");
		overflow.classList.remove("spaceimg-Overflow");

	})
}

let showdetails = queryResponse => {
	const urlParams = new URLSearchParams(window.location.search);
	id = urlParams.get('id');
	

	const naam = `${queryResponse.near_earth_objects[id].name}`;
	const naamltd = `${queryResponse.near_earth_objects[id].name_limited}`;
	const hazardous = `${queryResponse.near_earth_objects[id].is_potentially_hazardous_asteroid}`;
	const nasa_link = `${queryResponse.near_earth_objects[id].nasa_jpl_url}`;


	document.querySelector(`.js-astroid-name`).innerHTML = naam;
	document.querySelector(`.js-astroid-namelimited`).innerHTML = naamltd;
	document.querySelector(`.js-astroid-hazardous`).innerHTML = hazardous;
	document.querySelector(`.js-astroid-link`).setAttribute("href",nasa_link);


	const close_approach_data = queryResponse.near_earth_objects[id].close_approach_data

	for (i = 0; i < close_approach_data.length; i++){
		const dates = `${queryResponse.near_earth_objects[id].close_approach_data[i].close_approach_date_full}`

		var velocity = `${queryResponse.near_earth_objects[id].close_approach_data[i].relative_velocity.kilometers_per_second}`

		document.querySelector(`.js-astroid-approach`).innerHTML += `<p>${dates}  </p>`;
		document.querySelector(`.js-astroid-velocity`).innerHTML += `<p>${Number(velocity).toFixed(2)} Km on ${dates}  </p>`;

	}


	
};

// 3 Met de data van de API kunnen we de app opvullen
let showResult = queryResponse => {
	// get top 10 astroids
	var i;
	var leftspace = -5;
	for (i = 0; i < 10; i++){
		// console.log(`${queryResponse.near_earth_objects[i].name_limited}`)

		// get afstand astroids
		const afstand = `${queryResponse.near_earth_objects[i].close_approach_data[0].miss_distance.kilometers}`

		const space = document.querySelector(`.js-space` + i);

		// plaats de astroiden
		space.setAttribute('style', `bottom: ${afstand/200000}px; left:  ${leftspace += 9}%;`);
		
		space.innerHTML = `<a href="index.html?id=${i}"><img src="img/png/astroid.png" alt="astroid" class="c-astroid"></a>`
	}
};

// 2 Ophalen van de NASA API 
const getAPI = async () => {
	// Eerst bouwen we onze url op
	let url = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${key}`;
	
	// Met de fetch API proberen we de data op te halen.
	const data = await fetch(url)
	.then((res) => res.json())
	.catch(err => console.error(err))

	showResult(data);
	showdetails(data);
	
	
	
};

document.addEventListener('DOMContentLoaded', function() {
	console.log("dom loaded")
	// 1 We will query the API.
	getAPI();
	ListenToToggle();

});
