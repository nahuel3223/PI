import { React, useEffect} from "react";
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import "./Error.css"
import { getAllVideogames, getGamesGenre } from "../../actions";

export default function Error(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllVideogames())
        dispatch(getGamesGenre())
    });

    return(
        <Link to="/home">
            <div className="landing-container">
                <div className="landing-fullpage">
                    <div className="ingresar">
                        <div className="button-1">Error 404<br></br> Esta Pagina no existe</div>
                    </div>                
                </div>
            </div>
        </Link>
    );
}