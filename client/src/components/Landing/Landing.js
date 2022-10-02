import { React, useEffect} from "react";
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import "./Landing.css"
import { getAllVideogames, getGamesGenre } from "../../actions";

export default function Landing(){

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
                        <div className="button-1">HAZ CLICK PARA INGRESAR</div>
                    </div>                
                </div>
            </div>
        </Link>
    );
}