const key = 'j7Ek11xfTcE2ugN1xo8iEwdrZXOnTsSQVPwQjYoY'
var id = "";

// _ = helper functions

const ListenToToggle = function () {
	console.log("ListenToToggle initiated");
	btnForward = document.querySelector(`.js-toggle-forward`);
	btnBack = document.querySelector(`.js-toggle-back`);

	btnForward.addEventListener('click', function () {
		var newUrl = window.location.origin;
		newUrl += window.location.pathname;
		newUrl += `?id=${parseInt(id) + 1}`
		console.log(newUrl)
		setTimeout(function(){window.location.href = newUrl}, 1500);
		// window.location.href = newUrl
	})

	btnBack.addEventListener('click', function () {
		var newUrl = window.location.origin;
		newUrl += window.location.pathname;
		newUrl += `?id=${parseInt(id) - 1}`
		console.log(newUrl)

		setTimeout(function(){window.location.href = newUrl}, 1500);
		// window.location.href = newUrl
	})
}

let showdetails = queryResponse => {
	// console.log("show details");
	// console.log(`${queryResponse.near_earth_objects[0].close_approach_data[0].close_approach_date}`)

	const urlParams = new URLSearchParams(window.location.search);
	id = urlParams.get('id');
	// console.log(id)

	const naam = `${queryResponse.near_earth_objects[id].name}`;
	const naamltd = `${queryResponse.near_earth_objects[id].name_limited}`;
	const hazardous = `${queryResponse.near_earth_objects[id].is_potentially_hazardous_asteroid}`;
	const nasa_link = `${queryResponse.near_earth_objects[id].nasa_jpl_url}`;

	console.log(nasa_link)
	// close aproach date uit json halen
	// ${queryResponse.near_earth_objects[0].close_approach_data[0].close_approach_date}


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
	console.log({queryResponse});
	// console.log(`${queryResponse.near_earth_objects[0].close_approach_data[0].miss_distance.lunar}`)

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
		
		space.innerHTML = `<a href="detail.html?id=${i}"><img src="img/png/astroid.png" alt="astroid" class="c-astroid"></a>`
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
	
	// console.log(data);
	
	// Als dat gelukt is, gaan we naar onze showResult functie.
	if (window.location.pathname == "/InteractionDesign-Eindopdracht/index.html"){
		showResult(data);
	  }

	if (window.location.pathname == "/InteractionDesign-Eindopdracht/detail.html"){
	  showdetails(data);
	  ListenToToggle();
	}
	
	//test
	if (window.location.pathname == "/index.html"){
		showResult(data);
	}

	if (window.location.pathname == "/detail.html"){
	  showdetails(data);
	  ListenToToggle();
    }
};

document.addEventListener('DOMContentLoaded', function() {
	console.log("dom loaded")
	// 1 We will query the API.
	getAPI();

});
