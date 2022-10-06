import { React, useEffect} from "react";
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import "./Landing.css"
import { getGamesGenre } from "../../actions";

export default function Landing(){

    const dispatch = useDispatch()

    useEffect(() => {
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