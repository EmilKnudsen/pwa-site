import Movie from "./components/Movies/Movie";
import SearchContext from "./store/SearchContext";
import {useState} from "react";
import { Router } from "@reach/router";
import SelectedMovie from "./components/Movies/SelectedMovie";
require('dotenv').config()

function App() {


  Notification.requestPermission(function(status ){
    console.log("Notification permission status:", status);    
  })
 //=== sammenligner værdien og datatypen
  function displayNotification() {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg){
        reg.showNotification('Hello world!');
      });
    }
  }


  var searchState = useState([]); //Vi har gemt et state med et array som et tomt
  // Vores provider giver componenterne adgang til vores data
  return (
    <SearchContext.Provider value={searchState}>
      <div className="App">
      <Router>
        <Movie path="/"/>
        <SelectedMovie path="/:id" />
      </Router>


      </div>

      {/*<button onClick={() => displayNotification()}>Notify me!</button>*/}
    </SearchContext.Provider>
  );
}
export default App;
