import {
    GET_GENRES,
    GET_GAMES_ID,
    GET_ALL_VIDEOGAMES,
    GET_GAMES_QUERY,
    POST_VIDEOGAME,
    ORDER_FILTER,
    FILTER_GENRES,
} from "../actions/index";


const initialState = {
    genres: [],
    videogames: [],
    videogame: [],
    createdVideogame: [],
    filteredGames: [],
    orderedBy: "ALL",
    filteredBy: "ALL",
    currentPage: 1,
    platforms:""
};

function rootReducer(state = initialState, action) {
    switch (action.type){
        case GET_GENRES:
            return {
            ...state,
            genres: action.payload,
            };
        case GET_GAMES_ID:
            return {
                ...state,
                videogame: action.payload,
            };
        case POST_VIDEOGAME:
            return {
                ...state,
                createdVideogame: action.payload,
            };
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                filteredGames: action.payload,
            };
        case GET_GAMES_QUERY:
            return {
                ...state,
                videogames: action.payload,
                filteredGames: action.payload,
            };
        case FILTER_GENRES:
            if(action.payload === "ALL"){
                return {
                    ...state,
                    filteredGames: state.videogames,
                    filteredBy: action.payload,
                };
            } else { 
                return {
                    ...state,
                    filteredGames: state.videogames.filter((r) =>
                    r.genres.includes(action.payload)
                    ),
                    filteredBy: action.payload,
                }
            }
        case ORDER_FILTER:
            switch (action.payload) {
                case "A-Z":
                    return {
                        ...state,
                        filteredGames: [...state.filteredGames].sort((a, b) =>
                        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                        ),
                    orderedBy: action.payload,
                    };
                    case "Z-A":
                        return {
                            ...state,
                            filteredGames: [...state.filteredGames].sort((a, b) =>
                            a.name < b.name ? 1 : b.name < a.name ? -1 : 0
                            ),
                            orderedBy: action.payload,
                        };
                    case "ASC":
                        return {
                            ...state,
                            filteredGames: [...state.filteredGames].sort((a, b) =>
                            a.rating < b.rating ? 1 : b.rating < a.rating ? -1 : 0
                            ),
                
                            orderedBy: action.payload,
                        };
                    case "DESC":
                        return {
                            ...state,
                            filteredGames: [...state.filteredGames].sort((a, b) =>
                            a.rating > b.rating ? 1 : b.rating > a.rating ? -1 : 0
                            ),
                
                            orderedBy: action.payload,
                        };
                    case "API":
                        return {
                            ...state,
                            filteredGames: [...state.videogames].filter(
                            (r) => typeof r.id === "number"
                            ),
                            orderedBy: action.payload,
                        };
                    case "DB":
                        return {
                            ...state,
                            filteredGames: [...state.videogames].filter(
                            (r) => typeof r.id !== "number"
                            ),
                            orderedBy: action.payload,
                        };
                    case "ALL":
                        return {
                            ...state,
                            filteredGames: state.videogames,
                            orderedBy: action.payload,
                        };
            }
        default: 
            return state;
    }
}

export default rootReducer;
