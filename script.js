const APIKEY = "dfa9621f9b34c8c51982e15b0c50bc06";
let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImageURL = null;

var min_year_slider = document.getElementById("yearSlider");
var year_val_for_search = min_year_slider.value + "-01-01"
var output = document.getElementById("year_val");
output.innerHTML = "Minimum year: " + min_year_slider.value;
min_year_slider.oninput = function() {
    output.innerHTML = "Minimum year: " + this.value;
    year_val_for_search = min_year_slider.value + "-01-01";
}

function search() {
    getConfig()
}

function getConfig() {
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
        runSearch()
    })
    .catch(function(err){
        alert(err);
    });
}

/*
&sort_by=popularity.desc
&include_adult=false
&include_video=false
&page=1
&release_date.gte=1999-01-01
&release_date.lte=2010-01-01
*/

function runSearch() {
    let url = ''.concat(baseURL, 'discover/movie?api_key=', APIKEY, '&language=en-US', '&release_date.gte=', year_val_for_search);
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
        var result_select = random(0,data['results'].length)
        var path = data['results'][result_select]['poster_path'];
        img_source = ''.concat('http://image.tmdb.org/t/p/', 'w500', path);
        document.getElementById("output_image").src = img_source;
        document.getElementById('result_num').innerHTML = '&release_date.gte=' + year_val_for_search;
    })
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}