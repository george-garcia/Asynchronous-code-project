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
      if(response.status === 403) throw new Error('Too many requests, please wait and try again')
      else if(!response.ok) throw new Error('Something went wrong')
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
    })
    .catch(err => console.log(err))
}

whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// Test coordinates 1: 52.508, 13.381
// Test coordinates 2: 19.037, 72.873
// Test coordinates 3: -33.933, 18.474

// new promise
// the executor function is the async behavior
const lotteryPromise = new Promise(function(resolve, reject) {

  console.log('Lottery draw is happening');
  setTimeout(function() {
    if(Math.random() >= 0.5){
      resolve('You WIN')
    } else {
      reject(new Error('You lost your money'));
    }
  }, 2000)

});

lotteryPromise.then(res => console.log(res))
  .catch(err => console.error(err));

// Promisifying set timeout
const wait = function(seconds) {
  return new Promise(function(resolve) {
    setTimeout(resolve, seconds * 1000)
  })
}

wait(2).then(() =>{
  console.log('I waited two seconds');
  return wait(1);
  }).then(() => {
    console.log('I waited one second')
})

navigator.geolocation.getCurrentPosition(
  position => console.log(position),
  err => console.log(err)
);

const getPosition = function() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err))
  })
}

let img = '';
const imgPath1 = 'img/img-1.jpg';
const imgPath2 = 'img/img-2.jpg';
const imgPath3 = 'img/img-3.jpg';

const createImage = function(imgPath1) {
  return new Promise(function(resolve, reject) {
    img = document.createElement('img');
    img.src = imgPath1;
    img.classList.add('images');
    document.querySelector('.container').append(img);
    resolve(img);
  })
}

createImage(imgPath1).then((img) => {
  if(!img) return new Error('Image failed to load')
})

wait(2).then(() => {
  img.style.display = 'none';
}).then(() => wait(2)).then(() => {
  img.src = imgPath2;
  img.style.display = 'inline';
})

const whereAmIAsync = async function() {
  const res = await console.log('This is an async function');
  console.log('res');
}
whereAmIAsync();
console.log('this should display before the async function');

const get3countries = async function(c1, c2, c3){
  try{

    for(let i = 1; i < 4; i++){
      const data = await getJSON(`https://restcountries.com/v2/name/${c1}`)
      const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`)
      const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`)
    }

    console.log([])
  } catch(err) {
    console.log(err);
  }
}















