import React from "react";
import "./Card.css";

export default function Card(props) {
    return(
        <div className="card-container">
            <img className="img-card" src={props.image} alt={props.name} />
            <div className="card-info">
                <h3 className="card-title">{props.name}</h3>
                <h3 className="card-rating">Puntaje: {Math.round(props.rating)}/5</h3>
                <div className="card-genres">
                    <span className="genres-text">{props.genres?.join(" - ")}</span>
                </div>
            </div>
        </div>
    )
}