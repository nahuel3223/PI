import React, { useState } from "react";
import { getGamesByQuery } from "../../actions";
//import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Nav.css"

export default function Nav(){

    const [search, setSearch] = useState("");

    const dispatch = useDispatch();
    //const history = useHistory();

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) {
            return alert("Insertar nombre juego");
        } else {
            dispatch(getGamesByQuery(search));
            //history.push("/home");
        }
    };


    return(
        <div className="Navbar">
            <div className="left-side">
                <div className="nav-links">
                    <a className="nav-a" href="/">INICIO</a>
                    <a className="nav-a" href="/home">JUEGOS</a>
                    <a className="nav-a" href="/addvideogame">AGREGAR JUEGO</a>
                </div>
            </div>
            <div className="right-side">
                <form className="search-form" onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        className="search-text"
                        name="searchInput"
                        placeholder=" Buscar juego..."
                        onChange={handleChange}
                        value={search}>
                    </input>
                    <button className="button-search" type="submit" value={"Buscar"}>Buscar</button>
                </form>
            </div>
        </div>
        
    )
}