const key = 'j7Ek11xfTcE2ugN1xo8iEwdrZXOnTsSQVPwQjYoY'

// _ = helper functions



// 4 Zet de zon op de juiste plaats en zorg ervoor dat dit iedere minuut gebeurt.
let placeSunAndStartMoving = (totalMinutes, sunrise) => {
	// In de functie moeten we eerst wat zaken ophalen en berekenen.
	// Haal het DOM element van onze zon op en van onze aantal minuten resterend deze dag.
	const sun = document.querySelector('.js-sun');
	const minutesleft = document.querySelector('.js-time-left');

	// Bepaal het aantal minuten dat de zon al op is.
	const now = new Date();
	const sunriseDate = new Date(sunrise * 1000); // * 1000 voor in sec 

	let minutesSunUp = (now.getHours() * 60 + now.getMinutes()) - (sunriseDate.getHours() * 60 + sunriseDate.getMinutes())

	const percentage = (100/totalMinutes) * minutesSunUp; // verstrekenpercentage van de dag
	const sunLeft = percentage;
	const sunBottom = percentage < 50 ? percentage * 2 : (100 - percentage * 2 ) // dit is een if/else structuur (condition ? true : false;)


	// Nu zetten we de zon op de initiële goede positie ( met de functie updateSun ). Bereken hiervoor hoeveel procent er van de totale zon-tijd al voorbij is.
	updateSun(sun, sunLeft, sunBottom, now)
	
	// We voegen ook de 'is-loaded' class toe aan de body-tag.

	// Vergeet niet om het resterende aantal minuten in te vullen.
	minutesleft.innerText = totalMinutes - minutesSunUp;

	// Nu maken we een functie die de zon elke minuut zal updaten
	const t = setInterval(() => {
		// Bekijk of de zon niet nog onder of reeds onder is
		if ( minutesSunUp > totalMinutes) {
			clearInterval(t);
			ItBeNight();
		}
		else if (minutesSunUp < 0)
		{
			// TODO: enable night mode
			ItBeNight;
			
		}
		else
		{
			ItBeDay();
			// Anders kunnen we huidige waarden evalueren en de zon updaten via de updateSun functie.
			const now = new Date();
			const left = (100/totalMinutes) * minutesSunUp;
			const bottom = left < 50 ? left * 2 : (100 - left) * 2;

			// PS.: vergeet weer niet om het resterend aantal minuten te updaten.
			updateSun(sun, left, bottom, now);

			minutesleft.innerText = totalMinutes - minutesSunUp;

			// verhoog het aantal verstreken minuten.
			minutesSunUp++;
		}
	}, 6000); // getal in ms
};

// 3 Met de data van de API kunnen we de app opvullen
let showResult = queryResponse => {
	console.log({queryResponse});

	// const astroids = document.querySelector('.js-astroids');
	
	// var x;
	// for (x = 0; x < 10; x++){
	// 	astroids.innerHTML += `<span class="c-horizon__space js-space${x}" style="bottom: 40%; left: 1%;">
	// </span>`
	// }

	// get top 10 astroids
	var i;
	for (i = 0; i < 10; i++){
		console.log(`${queryResponse.near_earth_objects[i].name_limited}`)

		const space = document.querySelector(`.js-space` + i);

		// math.rondom = getal tussen 0 en 1 daarom * 100
		space.setAttribute('style', `bottom: ${Math.random()*100}%; left: ${Math.random()*100}%;`);
		
		space.innerHTML = `<a href="www.mywebsite.com/next.html"><img src="img/png/astroid.png" alt="astroid" class="c-astroid"></a>`
	}

	 
	 








	// // We gaan eerst een paar onderdelen opvullen
	// // Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
	// document.querySelector('.js-location').innerText = `${queryResponse.city.name},${queryResponse.city.country}`;
	// // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
	// document.querySelector('.js-sunrise').innerText = _parseMilliseconds( queryResponse.city.sunrise);
	// document.querySelector('.js-sunset').innerText = _parseMilliseconds(queryResponse.city.sunset);
	// // Hier gaan we een functie oproepen die de zon een bepaalde positie kan geven en dit kan updaten.
	// // Geef deze functie de periode tussen sunrise en sunset mee en het tijdstip van sunrise.
	// const timeDifference = ((queryResponse.city.sunset - queryResponse.city.sunrise) / 60); 
	
	// placeSunAndStartMoving(timeDifference, queryResponse.city.sunrise)
};

// 2 Ophalen van de NASA API 
const getAPI = async () => {
	// Eerst bouwen we onze url op
	let url = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${key}`;
	// Met de fetch API proberen we de data op te halen.
	const data = await fetch(url)
	.then((res) => res.json())
	.catch(err => console.error(err))
	
	//console.log(data);
	
	// Als dat gelukt is, gaan we naar onze showResult functie.
	showResult(data);
};

document.addEventListener('DOMContentLoaded', function() {
	console.log("dom loaded")
	// 1 We will query the API with longitude and latitude.
	getAPI();
});
