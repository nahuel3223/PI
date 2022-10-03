import axios from "axios";

export const GET_GAMES_QUERY = "GET_GAMES_QUERY";
export const GET_GAMES_ID = "GET_GAMES_ID";
export const GET_GENRES = "GET_GENRES";
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const ORDER_FILTER = "ORDER_FILTER";
export const FILTER_GENRES = "FILTER_GENRES";

export function getGamesByQuery(title) {
    return async function (dispatch) {
        let getGames = await axios.get(
            `http://localhost:3001/videogames?name=${title}`
        );
        let gamesData = getGames.data;
        return dispatch({ type: GET_GAMES_QUERY, payload: gamesData });
    };
}

export function getGamesById(gameId) {
    return async function (dispatch) {
        let getGamesId = await axios.get(
        `http://localhost:3001/videogame/${gameId}`
        );
        let gamesIdData = getGamesId.data;
        return dispatch({ type: GET_GAMES_ID, payload: gamesIdData });
    };
}

export function getGamesGenre() {
    return async function (dispatch) {
        let getGenre = await axios.get(`http://localhost:3001/genres`);
        let getGenreData = getGenre.data;
        return dispatch({ type: GET_GENRES, payload: getGenreData });
    };
}

export function postVideogame(info) {
    return async function (dispatch) {
        let postGame = await axios.post(`http://localhost:3001/videogames`, info);
        let postGameData = postGame.data;
        return dispatch({ type: POST_VIDEOGAME, payload: postGameData });
    };
}

export function getAllVideogames() {
    return async function (dispatch) {
        let getAllVideogames = await axios.get(`http://localhost:3001/videogames`);
        let getAllVideogamesData = getAllVideogames.data;
        return dispatch({ type: GET_ALL_VIDEOGAMES, payload: getAllVideogamesData });
    };
}

export function orderFilter(type) {
    return async function (dispatch) {
        return dispatch({ type: ORDER_FILTER, payload: type });
    };
}

export function filterGenres(data) {
    return async function (dispatch) {
        return dispatch({ type: FILTER_GENRES, payload: data });
    };
}