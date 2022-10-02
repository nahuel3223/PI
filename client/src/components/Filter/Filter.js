import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterGenres, getGamesGenre, orderFilter } from "../../actions";
import "./Filter.css";

export default function Filters() {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);

    useEffect(() => {
        dispatch(getGamesGenre());
    }, [dispatch]);

    function handleChange(e) {
        e.preventDefault();
        dispatch(orderFilter(e.target.value));
    }

    function handleGenres(e) {
        e.preventDefault();
        dispatch(filterGenres(e.target.value));
    }

    return (
        <div className="select-container">
        <div className="select">
            <label htmlFor="order" className="select-container">Ordenar por:</label>
            <select className="orders" onChange={handleChange}>
            <option value="ALL">Todos</option>
            <option value="A-Z">A - Z</option>
            <option value="Z-A">Z - A</option>
            <option value="ASC"> Mayor Rating</option>
            <option value="DESC"> Menor Rating</option>
            <option value="API"> Juegos de API</option>
            <option value="DB"> Juegos Agregados</option>
            </select>
        </div>
        <div className="select2">
            <label htmlFor="genres" className="select-container">Filtrar por:</label>
            <select className="order-genres" name="filters" onChange={handleGenres}>
            
            <option value="ALL">Todos</option>
            {genres?.map((g,i) =>
                (<option value={g.name} key={i} > {g.name}</option>),
            )}
            </select>
        </div>
        </div>
    );

}