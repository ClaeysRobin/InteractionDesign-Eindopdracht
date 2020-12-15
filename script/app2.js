const key = 'j7Ek11xfTcE2ugN1xo8iEwdrZXOnTsSQVPwQjYoY'

// _ = helper functions



let showdetails = queryResponse => {
	// console.log("show details");
	// console.log(`${queryResponse.near_earth_objects[0].close_approach_data[0].close_approach_date}`)

	

	

	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
	// console.log(id)

	const naam = `${queryResponse.near_earth_objects[id].name}`
	const naamltd = `${queryResponse.near_earth_objects[id].name_limited}`
	const hazardous = `${queryResponse.near_earth_objects[id].is_potentially_hazardous_asteroid}`

	// close aproach date uit json halen
	// ${queryResponse.near_earth_objects[0].close_approach_data[0].close_approach_date}


	document.querySelector(`.js-astroid-name`).innerHTML = naam;
	document.querySelector(`.js-astroid-namelimited`).innerHTML = naamltd;
	document.querySelector(`.js-astroid-hazardous`).innerHTML = hazardous;


	const close_approach_data = queryResponse.near_earth_objects[id].close_approach_data
	console.log(close_approach_data.length)

	for (i = 0; i < close_approach_data.length; i++){
		const dates = `${queryResponse.near_earth_objects[id].close_approach_data[i].close_approach_date_full}`

		const velocity = `${queryResponse.near_earth_objects[id].close_approach_data[i].relative_velocity.kilometers_per_second}`

		document.querySelector(`.js-astroid-approach`).innerHTML += `<p>${dates}  </p>`;
		document.querySelector(`.js-astroid-velocity`).innerHTML += `<p>${velocity} Km / Seconde  </p>`;

	}


	
};


// 3 Met de data van de API kunnen we de app opvullen
let showResult = queryResponse => {
	// console.log({queryResponse});
	// console.log(`${queryResponse.near_earth_objects[0].close_approach_data[0].miss_distance.lunar}`)

	// get top 10 astroids
	var i;
	var leftspace = -10;
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
	if (window.location.pathname == "/InteractionDesign-Eindopdracht/home.html"){
		showResult(data);
	  }

	if (window.location.pathname == "/InteractionDesign-Eindopdracht/detail.html"){
      showdetails(data);
    }
};

document.addEventListener('DOMContentLoaded', function() {
	console.log("dom loaded")
	// 1 We will query the API.
	getAPI();

});
