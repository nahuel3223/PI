import React, { useState, useEffect } from "react";
import { getGamesGenre, postVideogame } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Nav from "../Nav/Nav"
import "./AddVideogame.css";

export default function AddVideogame(){

    const [input, setInput] = useState({
        name: "",
        description: "",
        releaseDate: "",
        rating: "",
        platforms: "",
        image: "",
        genres: [],
    })

    const history = useHistory();
    const dispatch = useDispatch();
    const genresState = useSelector((store) => store.genres);
    const platformsArray = [' PC',' iOS',' Android',' macOS',' PlayStation 4','  PlayStation 5',' XBOX',' PS Vita']
    let selectedPlat = [];

    useEffect(() => {
        dispatch(getGamesGenre());
    }, [dispatch]);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const handleGenres = (e) => {
        setInput({
            ...input,
            [e.target.name]: Array.from(e.target.selectedOptions).map((p) =>{
                return p.value 
            }),
        });
    }

    const handlePlatforms = (e) => {
        selectedPlat = Array.from(e.target.selectedOptions).map((p) =>{
            return p.value
        })
        setInput({
            ...input,
            [e.target.name]:selectedPlat.toString()
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postVideogame(input));
        alert("Juego Agregado");
        history.push("/home");
    };

    return(
        <div className="full-add">
            <Nav/>
            <div className="form-container">
                <div className="title">
                    <h3> Ingresar datos del juego que desea agregar </h3>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label>Titulo</label>
                        <input
                        placeholder="Titulo del juego..."
                        className="input"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={input.name}
                        required
                        />
                    </div>

                    <div className="input-field">
                        <label>Descripcion</label>
                        <textarea
                        className="textarea"
                        placeholder="Descripcion del juego..."
                        name="description"
                        onChange={handleChange}
                        value={input.description}
                        required
                        />
                    </div>

                    <div className="input-field">
                        <label>Fecha de Lanzamiento</label>
                        <input
                        className="input"
                        type="date"
                        name="releaseDate"
                        onChange={handleChange}
                        value={input.releaseDate}
                        />
                    </div>

                    <div className="input-field">
                        <label>Imagen</label>
                        <input
                        className="input"
                        placeholder="URL de imagen..."
                        type="text"
                        name="image"
                        onChange={handleChange}
                        value={input.image}
                        required
                        />
                    </div>

                    <div className="input-field">
                        <label>Puntuacion (0-5)</label>
                        <input
                        className="input"
                        type="number"
                        min="0"
                        max="5"
                        name="rating"
                        onChange={handleChange}
                        value={input.rating}
                        />
                    </div>

                    <div className="input-field">
                        <label> Genero </label>
                        <div className="custom-select">
                            <select
                                name="genres"
                                multiple="multiple"
                                onChange={handleGenres}
                                required>
                                {genresState.map((g) => {
                                    return <option key={g.id} value={g.name}> {g.name} </option>;
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="extra-text">
                        Presionar tecla CTRL para seleccionar multiples generos
                    </div>

                    <div className="input-field">
                        <label> Plataformas </label>
                        <div className="custom-select">
                            <select name="platforms" multiple="multiple" onChange={handlePlatforms} required>
                                {platformsArray.map((p) => {
                                    return <option key={p.id} value={p}> {p} </option>;
                                })}
                            </select> 
                        </div>
                    </div>
                    <div className="extra-text">Presionar tecla CTRL para seleccionar multiples plataformas</div>
                        <div className="input-field">
                            <button className="button-add" type="submit">
                                <span>Agregar</span>
                            </button>
                        </div>
                </form>
            </div>
        </div>
    );
}