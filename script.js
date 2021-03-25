const APIKEY = "dfa9621f9b34c8c51982e15b0c50bc06";
let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImageURL = null;

var min_year_slider = document.getElementById("minYearSlider");
var min_year_val_for_search = min_year_slider.value + "-01-01"
var min_year_output = document.getElementById("min_year_val");
min_year_output.innerHTML = "Minimum year: " + min_year_slider.value;
min_year_slider.oninput = function() {
    min_year_output.innerHTML = "Minimum year: " + this.value;
    min_year_val_for_search = min_year_slider.value + "-01-01";
}

var max_year_slider = document.getElementById("maxYearSlider");
var max_year_val_for_search = max_year_slider.value + "-01-01"
var max_year_output = document.getElementById("max_year_val");
max_year_output.innerHTML = "Maximum year: " + max_year_slider.value;
max_year_slider.oninput = function() {
    max_year_output.innerHTML = "Maximum year: " + this.value;
    max_year_val_for_search = max_year_slider.value + "-01-01";
}

function search() {
    if (min_year_val_for_search > max_year_val_for_search) {
        alert("Minimum year must be less than maximum year")
    } else {
        getConfig()
    }
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
&with_watch_providers
&with_watch_region

'&with_genres=', getGenreVal(genre_string)

{"genres":[{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]}
*/

function getGenreVal() {
    var genre_string = '';
    var boxes = document.getElementsByClassName("genre");
    for (var i = 0, length = boxes.length; i < length; i++) {
        if (boxes[i].checked) {
            genre_string += boxes[i].value + ','
        }
    };
    if (genre_string.length == "") {
        alert("No genre(s) selected")
    } else {
        return genre_string.substring(0, genre_string.length - 1);
    };
}

function runSearch() {
    let url = ''.concat(baseURL, 'discover/movie?api_key=', APIKEY, '&language=en-US', '&sort_by=vote_count.desc', '&release_date.gte=', min_year_val_for_search, '&release_date.lte=', max_year_val_for_search);
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
        var number_of_pages = data["total_pages"];
        var page_number_select = random(0, number_of_pages);
        let url2 = ''.concat(baseURL, 'discover/movie?api_key=', APIKEY, '&language=en-US', '&sort_by=vote_count.desc', '&release_date.gte=', min_year_val_for_search, '&release_date.lte=', max_year_val_for_search, '&page=', page_number_select, '&with_genres=', getGenreVal());
        fetch(url2)
        .then(result=>result.json())
        .then((data)=>{
            var result_select = random(0,data['results'].length)
            var path = data['results'][result_select]['poster_path'];
            img_source = ''.concat('http://image.tmdb.org/t/p/', 'w500', path);
            document.getElementById("output_image").src = img_source;
            document.getElementById('film_link_from_image').href = 'https://www.themoviedb.org/movie/' + data['results'][result_select]['id'] + '?language=en-US';
            document.getElementById('result_num').innerHTML = getGenreVal();
        })
    })
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}