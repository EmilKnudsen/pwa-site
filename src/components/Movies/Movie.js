import { useContext } from "react"; //useContext bliver brugt til at bruge det som vores createContext laver
import SearchContext from "../../store/SearchContext";
import Search from "../SearchBar/Search";
import SingleMovie from "./SingleMovie";
import "./Movie.scss";

function Movie () {
  var [results] = useContext(SearchContext); //results bliver ændret fra vores Search setResults

  return(
    <div className="movie">
      <Search />
      {results?.map((movie) => ( // Der bliver mappet over vores søge resultat og printet ud via vores komponent
        <SingleMovie key={movie.imdbID} title={movie.Title} image={movie.Poster} year={movie.Year} id={movie.imdbID} />
        //Vi smider vores map ind i vores useState array i App.js
      ))}
    </div>
  )
}

export default Movie;