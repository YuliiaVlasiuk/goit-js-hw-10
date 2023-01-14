import './css/styles.css';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
var debounce = require('lodash.debounce');
let name = 'Ukraine';

let inputSearch = document.querySelector('#search-box');
let countryList = document.querySelector('.country-list');


inputSearch.addEventListener('input', debounce(onSearching,300))

function onSearching(evt) {
  name = evt.target.value.trim();
  countryList.innerHTML = '';

  if (!name){
        return alert('add value')
     }
  
fetchCountries(name).then(data => {
    if (data.length > 10) {
      Notiflix.Notify.failure(
        'Too many matches found. Please enter a more specific name.'
      );
      return;
    } else {
      if (data.length > 1 && data.length <= 10) {
          countryList.innerHTML = createMarkupList(data);
      } else {
        countryList.innerHTML = createMarkup(data);
      }
    }
  });
}

function createMarkupList(arr) {
  console.log(arr);
  return arr
    .map(
      ({ name: { official: name }, flags: { svg: flag } }) =>
        ` <li  >
        <div class="list_of_countries" >
          <img class="flag" src="${flag}" alt="${name}" />
          <p>${name}</p>
          </div>
         </li>`
    )
    .join('');
}

function createMarkup(arr) {
  console.log(arr);
  return arr
    .map(
      ({ name: { official: name }, 
        flags: { svg: flag },
        capital,
        population,
        languages    
    }) =>
        ` <li>
                  <div class="list_of_countries" >
                    <img class="flag" src="${flag}" alt="${name}" />
                    <h1>${name}</h1>
                  </div>
                  <p> <b>Capital</b>: ${capital}</p>
                  <p> <b> Population: </b>${population}</p>
                  <p> <b> Languages:</b> ${Object.values(languages).join(', ')}</p>
            </li>`
    ).join('');
}

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
  
  


Notiflix.Notify.init({
  position: 'center-top',
  width: '300px',
  distance: '10px',
  opacity: 1,
  rtl: false,
  timeout: 1000,
});
