const API_KEY = '13034522ae1dba1beb7eb678a5ec0681'
const IMAGE_URL='https://image.tmdb.org/t/p/w500/'

// const url = 'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=13034522ae1dba1beb7eb678a5ec0681'
const url = `https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=`
const newUrl ='https://api.themoviedb.org/3/search/movie?query='

const searchBtn = document.querySelector('.search-btn')
const searchInput = document.querySelector('#search')
const moviesContainer = document.querySelector( '.movies-container')

/*
 <div class="movies">
                <div class="img-container">
                    <a href="#" class="">
                        <img src="/img/d4.jpg" alt="movie-1">
                    </a>
                </div>
                <div class="desc">
                    <p class="movie-title">Rockson</p>
                    <p class="movie-date">May 24, 2024</p>
                </div>
            </div>
*/
function createMovieContainer (movies){
    const movieElement = document.createElement('div')
    movieElement.setAttribute('class', 'movies')

    // const imgContainer = document.createElement('div')
    // imgContainer.setAttribute('class', 'img-container')

    // ______Descritons________________
    // const descContainer = document.createElement('div')
    // descContainer.setAttribute('class', 'desc')

    // const movieTitle = document.createElement('p')
    // movieTitle.setAttribute('class', 'movie-title')

    // const movieDate = document.createElement('p')
    // movieDate.setAttribute('class', 'movie-date')
    const ImageContainer = (movie) =>{

        if(movie.poster_path){
            return `
            <img src=${ IMAGE_URL + movie.poster_path} data-movie-id=${movie.id}>
            `
        }
    }



    const movieTemplate = `
    ${movies.map((movie)=> {
        return ` 
                    <div class="content ">
                    <div class="img-container">
                    <a href="#" class="">
                       ${ ImageContainer(movie)}
                    </a>
                    </div>
                    <div class="desc">
                    <p class="movie-title">${movie.title}</p>
                    <p class="movie-date">${movie.release_date}</p>
                    </div>

                    </div>
                    `
                }) 
                }
    `

    movieElement.innerHTML = movieTemplate;
    return movieElement
}



searchBtn.onclick = function (e){
    e.preventDefault()
    const value = searchInput.value
    const newSearch = newUrl + value  + '&api_key=' + API_KEY

    fetch(newSearch)
        .then((res) =>res.json())
        .then((data) =>{
            const movies = data.results

           const movieBlock = createMovieContainer(movies)
            moviesContainer.appendChild(movieBlock)
            console.log(movies)
        })
        .catch(err => console.log({Error: err.message}))




}