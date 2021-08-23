import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import PouchDB from "pouchdb";
var db = new PouchDB("movieDB");

function StarRating ({id}) {
    const [rating, setRating] = useState(0); // initial rating value
    const [starValue, setStarValue] = useState(0);
  
    // Catch Rating value
    const handleRating = (rate) => {
      setRating(rate);
      HandleMovie(rate);
    };
  
    function HandleMovie(rate) {
      db.put({
        movieId: id,
        value: rate,
        _id: id,
      })
        .then(function (response) {
          // handle response
        })
        .catch(function (err) {
          console.log(err);
        });
    }
    db.get(id, function (err, doc) {
      if (err) {
        return null;
      } else {
        setStarValue(doc.value);
      }
    });
  
    return <Rating onClick={handleRating} ratingValue={starValue} /* Rating Props */ />;
}

export default StarRating;