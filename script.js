'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function(data, className = '') {
  const html = `
        <article class='country ${className}'>
          <img class='country__img' src='${data.flag} ' />
          <div class='country__data'>
            <h3 class='country__name'>${data.name}</h3>
            <h4 class='country__region'>${data.region}</h4>
            <p class='country__row'><span>👫</span>${data.population}</p>
            <p class='country__row'><span>🗣️</span>${data.languages[0].name}</p>
            <p class='country__row'><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
        `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

// const getCountryData = function(country) {
//
//
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbor = data[0].borders?.[0];
//
//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbor}`)
//     })
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data, 'neighbour');
//     })
//     .catch(err => alert(err))
// }
// btn.addEventListener('click', function() {
//   const country = document.getElementById('count').value;
//   getCountryData(country);
// });

const getCountryAndNeighbor = function(country) {

  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function() {

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbor Country 2
    const [neighbor] = data.borders;
    console.log(`border = ${neighbor}`);

    if(!neighbor) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function() {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });

  });
}

const getJSON = function(url, errorMsg = 'Something went wrong') {
  return fetch(url)
    .then(response => {
      if(!response.ok) throw new Error(`${errorMsg} (${response.status})`);

      return response.json();
    });
}

const request = fetch('https://restcountries.com/v2/name/portugal');
console.log(request);

const getCountryData = function(country) {


  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];

      // Country 2
      return getJSON(`https://restcountries.com/v2/alpha/${neighbor}`, 'Neighbor not found')
    })
    .then(data => {
      renderCountry(data, 'neighbour');
    })
}
btn.addEventListener('click', function() {
  const country = document.getElementById('count').value;
  getCountryData(country);
});

// getCountryAndNeighbor(request);
// getCountryAndNeighbor('mexico');
// getCountryAndNeighbor('usa');

// new api address
// https://restcountries.com/v2/

// curl 'https://geocode.xyz/51.50354,-0.12768?geoit=json'

function whereAmI(lat, lng){
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
    })
}

whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// Test coordinates 1: 52.508, 13.381
// Test coordinates 2: 19.037, 72.873
// Test coordinates 3: -33.933, 18.474

/**
 *
 * {
 *     "statename": {},
 *     "distance": "0.000",
 *     "elevation": "39",
 *     "osmtags": {
 *         "wikipedia": "de:Berlin-Mitte",
 *         "wikidata": "Q2013767",
 *         "source": "http://wiki.openstreetmap.org/wiki/Import/Catalogue/Kreisgrenzen_Deutschland_2005",
 *         "name_de": "Mitte",
 *         "name_prefix": "Ortsteil",
 *         "ref": "0101",
 *         "place": "suburb",
 *         "name": "Mitte",
 *         "geographical_region": "Berliner Urstromtal",
 *         "name_ru": "Митте",
 *         "admin_level": "10",
 *         "boundary": "administrative",
 *         "type": "boundary"
 *     },
 *     "state": "Berlin",
 *     "latt": "52.50800",
 *     "city": "Berlin",
 *     "prov": "DE",
 *     "geocode": "BERLIN-YMXPC",
 *     "geonumber": "3058574411076",
 *     "country": "Germany",
 *     "stnumber": "5",
 *     "staddress": "Niederkirchnerstraße",
 *     "inlatt": "52.50800",
 *     "alt": {
 *         "loc": [
 *             {
 *                 "staddress": "Niederkirchnerstraße",
 *                 "stnumber": "5",
 *                 "postal": "10117",
 *                 "latt": "52.508",
 *                 "city": "Berlin",
 *                 "prov": "Berlin",
 *                 "longt": "13.381",
 *                 "class": {}
 *             },
 *             {
 *                 "staddress": "Niederkirchnerstraße",
 *                 "stnumber": "5",
 *                 "postal": "10117",
 *                 "dist": "0.000",
 *                 "latt": "52.508",
 *                 "city": "Berlin",
 *                 "prov": "Berlin",
 *                 "longt": "13.381",
 *                 "class": {}
 *             }
 *         ]
 *     },
 *     "timezone": "Europe/Berlin",
 *     "region": "Berlin",
 *     "postal": "10117",
 *     "poi": {
 *         "website": "https://www.doktor-kugler.de/",
 *         "operator": "Dr. med. Anton Kugler, Astrid Vonau",
 *         "poilon": "13.3812",
 *         "id": "8105267094",
 *         "poilat": "52.5049",
 *         "opening_hours": "Mo 08:00-16:00; Tu 08:00-13:00, 14:00-20:00; We 08:00-12:00, 14:00-19:00; Th 08:00-14:00; Fr 08:00-12:00;",
 *         "wheelchair": "yes",
 *         "name": "Zahnarztpraxis am Askanischen Platz",
 *         "addr_postcode": "10963",
 *         "addr_street": "Askanischer Platz",
 *         "phone": "+49 30 25420611",
 *         "healthcare_speciality": "general",
 *         "amenity": "doctors",
 *         "level": "0",
 *         "addr_housenumber": "1",
 *         "poidist": "0.345",
 *         "healthcare": "doctor"
 *     },
 *     "longt": "13.38100",
 *     "remaining_credits": {},
 *     "confidence": "0.9",
 *     "inlongt": "13.38100",
 *     "class": {},
 *     "adminareas": {
 *         "admin10": {
 *             "wikipedia": "de:Berlin-Mitte",
 *             "wikidata": "Q2013767",
 *             "source": "http://wiki.openstreetmap.org/wiki/Import/Catalogue/Kreisgrenzen_Deutschland_2005",
 *             "name_de": "Mitte",
 *             "name_prefix": "Ortsteil",
 *             "ref": "0101",
 *             "place": "suburb",
 *             "name": "Mitte",
 *             "geographical_region": "Berliner Urstromtal",
 *             "name_ru": "Митте",
 *             "admin_level": "10",
 *             "level": "10",
 *             "boundary": "administrative",
 *             "type": "boundary"
 *         },
 *         "admin9": {
 *             "wikipedia": "de:Bezirk Friedrichshain-Kreuzberg",
 *             "source": "http://wiki.openstreetmap.org/wiki/Import/Catalogue/Kreisgrenzen_Deutschland_2005",
 *             "postal_addr_city": "Berlin",
 *             "is_in_state_code": "BE",
 *             "website": "http://www.berlin.de/ba-friedrichshain-kreuzberg/",
 *             "is_in_region": "Berlin",
 *             "place": "borough",
 *             "geographical_region": "Berliner Urstromtal",
 *             "is_in_country_code": "DE",
 *             "postal_addr_street": "Postfach 35 07 01",
 *             "postal_addr_housename": "Bezirksamt Friedrichshain-Kreuzberg von Berlin",
 *             "name_ru": "Фридрихсхайн-Кройцберг",
 *             "boundary": "administrative",
 *             "is_in_country_prefix": "Bundesrepublik",
 *             "wikidata": "Q158893",
 *             "is_in_continent": "Europe",
 *             "is_in_county": "Berlin",
 *             "is_in_state": "Berlin",
 *             "name_prefix": "Bezirk",
 *             "ref": "02",
 *             "is_in_city": "Berlin",
 *             "postal_addr_note": "Angabe von \"Bürgeramt x\" (1,2,3) für gezielte Anschrift möglich.",
 *             "name": "Friedrichshain-Kreuzberg",
 *             "postal_addr_postcode": "10216",
 *             "description": "2. Verwaltungsbezirk von Berlin",
 *             "is_in_country": "Deutschland",
 *             "admin_level": "9",
 *             "level": "9",
 *             "postal_addr_country": "DE",
 *             "type": "boundary"
 *         }
 *     },
 *     "altgeocode": "ERPLATZ-YMXPC"
 * }
 */
























