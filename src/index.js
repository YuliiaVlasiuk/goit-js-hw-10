import './css/styles.css';


const DEBOUNCE_DELAY = 300;
let name = 'Ukraine';


let inputSearch = document.querySelector('#search-box');

inputSearch.addEventListener('input', onSearching);

function onSearching(evt) {
  name = evt.currentTarget.value;

  fetchCountries(name).then(data => {
    if (data.length > 4) {
      alert('Too many matches found. Please enter a more specific name.');
      return
    }
console.log(data.length);
  });
}

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
