/*************
SAMPLE URLS

1. To get the config data like image base urls
https://api.themoviedb.org/3/configuration?api_key=<APIKEY>

2. To fetch a list of movies based on a keyword
https://api.themoviedb.org/3/search/movie?api_key=<APIKEY>&query=<keyword>

3. To fetch more details about a movie
https://api.themoviedb.org/3/movie/<movie-id>?api_key=<APIKEY>
*************/
//const APIKEY is inside key.js
const APIKEY = dfa9621f9b34c8c51982e15b0c50bc06;
let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImageURL = null;

let getConfig = function () {
    let url = "".concat(baseURL, 'configuration?api_key=', APIKEY); 
    fetch(url)
    .then((result)=>{
        return result.json();
    })
    .then((data)=>{
        baseImageURL = data.images.secure_base_url;
        configData = data.images;
        console.log('config:', data);
        console.log('config fetched');
        runSearch('jaws')
    })
    .catch(function(err){
        alert(err);
    });
}

let runSearch = function (keyword) {
    let url = ''.concat(baseURL, 'search/movie?api_key=', APIKEY, '&query=', keyword);
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
        //process the returned data
        document.getElementById('output').innerHTML = JSON.stringify(data, null, 4);
        //work with results array...
        
    })
}

document.addEventListener('DOMContentLoaded', getConfig);