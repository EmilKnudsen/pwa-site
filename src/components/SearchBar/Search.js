import "./Search.scss";
import SearchContext from "../../store/SearchContext";
import { useContext } from "react";

function Search () {
  var setResults = useContext(SearchContext)[1]; //setResults ændrer results som bliver brugt i vores Movies.js hvor den bliver printet ud.

  function handleSubmit(event) {
    event.preventDefault() // Gør så der ikke er pageload når vi søger
    console.log(event.target.search.value)

    fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?s=${event.target.search.value}&page=1&r=json`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "cbf0eada93mshda4348a7166d51bp13e11bjsna5929dc3ff1a",
		"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(data => { 

  console.log(data)
  setResults(data.Search); //Her sætter vi vores data til at være det vi søger efter.
})
.catch(err => {
	console.error("err: ",err);
});

  }

  return (
    <div className="search">
      <h1 className="search__header">MOVIE TIME</h1>
      <form className="search__form" onSubmit={handleSubmit}>
        <input className="search__input" type="search" name="search" placeholder="search" />
        <button className="search__button">Search</button>
      </form>
    </div>
  )
}

export default Search;