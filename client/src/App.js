import React, { Fragment }from 'react';
import './App.css';
import { Route } from "react-router-dom";
import Landing from './components/Landing/Landing.js';
import Home from './components/Home/Home.js'
import Detail from "./components/Detail/Detail.js"
import AddVideogame from "./components/AddVideogame/AddVideogame.js"
import Error from "./components/Error/Error"


function App() {
  return (
    <div className="App">
      <Fragment>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/videogame/:id" component={Detail}/>
        <Route exact path="/addvideogame" component={AddVideogame}/>
        {/* <Route path="*" component={Error}/> */}
      </Fragment>
    </div>
  );
}

export default App;

