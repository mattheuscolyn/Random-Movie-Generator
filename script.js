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
const APIKEY = "dfa9621f9b34c8c51982e15b0c50bc06";
let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImageURL = null;

function search() {
    search_term = document.getElementById("search").value
    getConfig(search_term)
}

let getConfig = function (input) {
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
        runSearch(input)
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
        var path = data['results'][1]['poster_path']
        img_source = ''.concat('http://image.tmdb.org/t/p/', 'w500', path);
        document.getElementById("output_image").src = img_source;
    })
}

/***** 
var search_data = JSON.parse(data);
var path = search_data['results'][1]['backdrop_path']
var img = document.createElement("img");
img.src = ''.concat('http://image.tmdb.org/t/p/', 'w185', path);
var src = document.getElementById("output");
src.appendChild(img);       
*/