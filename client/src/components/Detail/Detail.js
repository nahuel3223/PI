import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGamesById } from "../../actions";
import "./Detail.css";
import Nav from "../Nav/Nav";

export default function Detail(props){

    const id = props.match.params.id;

    const dispatch = useDispatch();
  
    const videogame = useSelector((state) => state.videogame);
  
    useEffect(() => {
      dispatch(getGamesById(id));
    }, [dispatch, id]);

    return (
        <div className="details-container">
            <Nav/>
            <div className="container-details">
                <div className="left">
                        <div className="div-img">
                            <img className="img-detail" src={videogame.image} alt="Videogame"></img>
                        </div>
                        <div className="info">
                            <h1>{videogame.name}</h1>
                            <h3>Fecha de Lanzamiento:</h3>
                            <p> {videogame.released}</p>
                            <h3>Genero/s:</h3>
                            <p>{videogame.genres?.join(" - ")}</p>
                            <h3>Plataformas:</h3>
                            <p>{videogame.platforms}</p>
                            <h3>Puntaje: {videogame.rating}/5</h3>
                        </div>
                </div>
                <div className="right">
                    <div className="description-text">
                        <h3>Descripcion</h3>
                        <p>{videogame.description}</p>
                    </div>
                </div>
            </div>
        </div>    
)}
