import { Link } from "@reach/router";
import "./SingleMovie.scss"
import StarRating from "../StarRating/StarRating";
import PouchDB from "pouchdb";
import {useState} from "react";
var db = new PouchDB("movieDB");

function SingleMovie ( {title, year, image, id } ) {
	const [starValue, setStarValue] = useState(0);

	db.get(id, function (err, doc) {
		if (err) {
			return null;
		} else {
			setStarValue(doc.value);
		}
	});

  return (
    <div className="singleMovie" key={id}>
      <div className="singleMovie__container">
        <Link to={id}><img className="singleMovie__image" src={image} alt="" /></Link>
        <p className="singleMovie__title">{title}</p>
        <p className="singleMovie__year">{year}</p>
        <StarRating id={id} />
      </div>
    </div>
  )
}

export default SingleMovie;