import React, { useState, useEffect, useRef } from "react";
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
        errorName:"Ingresa un titulo",
        errorDescription:"Ingresa una descripcion",
        errorRating:"Ingresa un numero del 1 al 5",
        errorUrlImagen:"Copia y pega una URL de imagen valida",
        errorDate:"Ingresa una fecha",
        errorPlatform:"Selecciona al menos una plataforma",
        errorGenres:"Selecciona al menos un genero",
    })

    const history = useHistory();
    const dispatch = useDispatch();
    const genresState = useSelector((store) => store.genres);
    const platformsArray = [' PC',' iOS',' Android',' macOS',' PlayStation 4','  PlayStation 5',' XBOX',' PS Vita']
    let selectedPlat = [];

    const {nameRef, descriptionRef, ratingRef, imageRef, dateRef, genresRef, platformsRef} = useRef()

    useEffect(() => {
        dispatch(getGamesGenre());
    }, [dispatch]);

    //------------------------------------------------------HandleSubmit

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postVideogame(input));
        alert("Juego Agregado");
        history.push("/home");
    };

    //----------------------------------------------------------Validators


    function validateName(e) {
        if(e.target.value.length === 0){
            setInput({
                ...input,
                name:"",
                errorName:"Ingresa un Titulo",
            })
        }else{
            setInput({
                ...input,
                errorName:"",
                [e.target.name]:e.target.value,
            })
        }
    }

    function validateDescription(e) {
        if(e.target.value.length === 0){
            setInput({
                ...input,
                description:"",
                errorDescription:"Ingresa una descripcion",
            })
        }else{
            setInput({
                ...input,
                errorDescription:"",
                [e.target.name]:e.target.value
            })
        }
    }

    function validateRating(e) {
        if(!/^[1-5]$/.test(e.target.value)){
            setInput({
                ...input,
                rating:"",
                errorRating:"Ingresa un numero del 1 al 5",
            })
        }else{
            setInput({
                ...input,
                errorRating:"",
                [e.target.name]:e.target.value
            })
        }
    }

    function validateDate(e) {
        if(e.target.value.length === 0){
            setInput({
                ...input,
                errorDate:"Ingresa una fecha",
                releaseDate:"",
            })
        }else{
            setInput({
                ...input,
                errorDate:"",
                [e.target.name]:e.target.value
            })
        }
    }

        function validateImage(e) {
        if(!/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(e.target.value)){
            setInput({
                ...input,
                errorUrlImagen:"Copia y pega una URL de imagen valida",
                image:""
            })
        }else{
            setInput({
                ...input,
                errorUrlImagen:"",
                [e.target.name]:e.target.value
            })
        }
    }

    function validateGenres(e) {
        if(e.target.selectedOptions.length === 0){
            setInput({
                ...input,
                errorGenres:"Selecciona al menos un genero",
                genres:[],
            })
        }else{
            setInput({
                ...input,
                errorGenres:"",
                [e.target.name]: Array.from(e.target.selectedOptions).map((p) =>{
                    return p.value 
                })
            })
        }
    }

    function validatePlatform(e) {
        selectedPlat = Array.from(e.target.selectedOptions).map((p) =>{
            return p.value
        })
        if(e.target.selectedOptions.length === 0){
            setInput({
                ...input,
                errorPlatform:"Selecciona al menos una plataforma",
                platforms:"",
            })
        }else{
            setInput({
                ...input,
                errorPlatform:"",
                [e.target.name]:selectedPlat.toString()
            })
        }
    }

    const showButton = input.name.length === 0 || input.description.length === 0 || input.rating.length === 0 || input.releaseDate.length === 0 || input.platforms.length === 0 || input.genres.length === 0 || input.image.length === 0

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
                        className="inputAdd"
                        type="text"
                        name="name"
                        onChange={validateName}
                        value={input.name}
                        ref={nameRef}
                        />
                        {(input.errorName.length === 0) ? null :<span className="error">{input.errorName}</span>}
                    </div>

                    <div className="input-field">
                        <label>Descripcion</label>
                        <textarea
                        className="textarea"
                        placeholder="Descripcion del juego..."
                        name="description"
                        onChange={validateDescription}
                        value={input.description}
                        ref={descriptionRef}
                        />
                        {(input.errorDescription.length === 0) ? null :<span className="error">{input.errorDescription}</span>}
                    </div>

                    <div className="input-field">
                        <label>Fecha de Lanzamiento</label>
                        <input
                        className="inputAdd"
                        type="date"
                        name="releaseDate"
                        onChange={validateDate}
                        value={input.releaseDate}
                        ref={dateRef}
                        />
                        {(input.errorDate.length === 0) ? null :<span className="error">{input.errorDate}</span>}
                    </div>

                    <div className="input-field">
                        <label>Imagen</label>
                        <input
                        className="inputAdd"
                        placeholder="URL de imagen..."
                        type="text"
                        name="image"
                        onChange={validateImage}
                        value={input.image}
                        ref={imageRef}
                        />
                        {(input.errorUrlImagen.length === 0) ? null :<span className="error">{input.errorUrlImagen}</span>}
                    </div>

                    <div className="input-field">
                        <label>Puntuacion (0-5)</label>
                        <input
                        className="inputAdd"
                        type="number"
                        name="rating"
                        onChange={validateRating}
                        value={input.rating}
                        ref={ratingRef}
                        />
                        {(input.errorRating.length === 0) ? null :<span className="error">{input.errorRating}</span>}
                    </div>

                    <div className="input-field">
                        <label> Genero </label>
                        <div className="custom-select">
                            <select
                            className="inputSelect"
                                name="genres"
                                multiple="multiple"
                                onChange={validateGenres}
                                ref={genresRef}
                                >
                                {genresState.map((g) => {
                                    return <option key={g.id} value={g.name}> {g.name} </option>;
                                })}
                            </select>
                            {(input.errorGenres.length === 0) ? null :<span className="error">{input.errorGenres}</span>}
                        </div>
                    </div>
                    <div className="extra-text">
                        Presionar tecla CTRL para seleccionar multiples generos
                    </div>

                    <div className="input-field">
                        <label> Plataformas </label>
                        <div className="custom-select">
                            <select 
                            className="inputSelect"
                            name="platforms" 
                            multiple="multiple" 
                            onChange={validatePlatform}
                            ref={platformsRef}
                            >
                                {platformsArray.map((p) => {
                                    return <option key={platformsArray.indexOf(p)} value={p}> {p} </option>;
                                })}
                            </select>
                            {(input.errorPlatform.length === 0) ? null :<span className="error">{input.errorPlatform}</span>}
                        </div>
                    </div>
                    <div className="extra-text">Presionar tecla CTRL para seleccionar multiples plataformas</div>
                        <div className="input-field">
                            {showButton ? null : <button className="button-add" type="submit">
                                <span>Agregar</span>
                            </button>}
                        </div>
                </form>
            </div>
        </div>
    );
}