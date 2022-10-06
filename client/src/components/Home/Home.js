import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import "./Home.css";
import Nav from "../Nav/Nav"
import Filter from"../Filter/Filter"
import Pages from "../Pages/Pages";
import Card from"../Card/Card"
import { getAllVideogames } from "../../actions";

export default function Home(){
    
    const videogames = useSelector((store) => store.videogames);
    const filteredGames = useSelector((store) => store.filteredGames);
    const orderBy = useSelector((state) => state.orderedBy);
    const filteredBy = useSelector((state) => state.filteredBy);
    const [posts, setPosts] = useState(videogames);
    const [actualPage, setActualPage] = useState(1);
    const dispatch = useDispatch();

    const indexOfLastPost = actualPage * 15;
    const indexOfFirstPost = indexOfLastPost - 15;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() => {
        if (!videogames.length) {
            dispatch(getAllVideogames());
        }
        }, [dispatch, videogames.length]);
    
    useEffect(() => {
        if (filteredBy === "ALL" && orderBy === "ALL") {
            setPosts(videogames);
        } else {
            setPosts(filteredGames);
        }
        setActualPage(1);
    }, [videogames, filteredGames, filteredBy, orderBy]);
    
    let max = Math.ceil(posts.length / 15);

    if(videogames.length === 0){
        return(
            <div className="home-fullpage">
                <Nav/>
                <h2 className="cargando">Cargando juegos...</h2>
            </div>
        )
    }else{
        return(
            <div className="home-fullpage">
                <Nav/>
                <div className="order-bar">
                    <div className="pages">
                        <Pages
                        currentPage={actualPage}
                        setCurrentPage={setActualPage}
                        maxPages={max}
                        />
                    </div>
                    <div className="filter">
                        <Filter/>
                    </div>
                </div>
                <div className="home-card">
                    {currentPosts.map((game) => (
                        <div className="cards-container" key={game.id}>
                            <Link to={`/videogame/${game.id}`} className="link-card">
                                <Card
                                name={game.name}
                                image={game.image}
                                genres={game.genres}
                                rating={game.rating}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
