import {useEffect, useState} from "react"
import { FaAngleLeft } from "react-icons/fa";
import { Rating, RatingView } from 'react-simple-star-rating'
import PouchDB from "pouchdb";
import "./SelectedMovie.scss";

var db = new PouchDB("movieDB");
require("dotenv").config();

function SelectedMovie ({ id }) {
  const [movie, setMovie] = useState([]);
	const [starValue, setStarValue] = useState(0);
	var apiKey = process.env.REACT_APP_API_KEY;

	useEffect(() => {
		fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?i=${id}&r=json`, {
			method: "GET",
			headers: {
				"x-rapidapi-key": `${apiKey}`,
				"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setMovie(data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [id, apiKey]);

	db.get(id, function (err, doc) {
		if (err) {
			return null;
		} else {
			setStarValue(doc.value);
		}
	});

  return (
	<>
		<button className="goback" onClick={() => window.history.back()}>
		<i><FaAngleLeft className="goback__icon"/></i>
		</button>

		<div className="selectedMovie">
				<h1 className="selectedMovie__title">{movie.Title}</h1>
				<div className="selectedMovie__details">
					<p>{movie.Type}</p>
					<p>{movie.Runtime}</p>
					<p>{movie.Genre}</p>
				</div>
				<div className="selectedMovie__overview">
					<img className="selectedMovie__image" src={movie.Poster} alt="" />
					<div className="selectedMovie__info">
						<p>{movie.Country}</p>
						<p>{movie.Production}</p>
						<p>Imdb Rating: {movie.imdbRating}</p>
						<Rating ratingValue={starValue} /* Rating Props */ />
						<p>{movie.Language}</p>
						<p>{movie.Actors}</p>
						<p>Box office {movie.BoxOffice}</p>
						<p>Director {movie.Director}</p>
					</div>
				</div>
				<div>
					<p>Awards</p>
					<p>{movie.Awards}</p>
				</div>
				<p>{movie.Plot}</p>
			</div>
		</>
  )
}

export default SelectedMovie;