import './css/styles.css';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
let name = 'Ukraine';

let inputSearch = document.querySelector('#search-box');
let countryList=document.querySelector('.country-list');

inputSearch.addEventListener('input', onSearching);

function onSearching(evt) {
  name = evt.currentTarget.value;
  countryList.innerHTML='';
  fetchCountries(name).then(data => {

    if (data.length > 10) {
      Notiflix.Notify.failure(
        'Too many matches found. Please enter a more specific name.'
      );
      return;
    } else 
    {
       if (data.length >=2 && data.length <=10){
               
      console.log(data.length);

      countryList.innerHTML=createMarkup(data)}
  }

 console.log('one');

})
}

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function createMarkup(arr) {
  console.log(arr);
  return arr
    .map(
      ({
        name: {official:name},
        flags: {svg :flag},
      }) =>
        ` <li  class="list_of_countries">
          <img class="flag" src="${flag}" alt="${name}" />
          <h3>${name}</h3>
         </li>`
    )
    .join('');
}

Notiflix.Notify.init({
  position: 'center-top',
  width: '300px',
  distance: '10px',
  opacity: 1,
  rtl: false,
  timeout: 1000,
});
