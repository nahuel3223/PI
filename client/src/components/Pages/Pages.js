import "./Pages.css";
import React, { useState } from "react";

export default function Pages({ currentPage, setCurrentPage, maxPages }) {
    const p = [];
    const [input, setInput] = useState(1);

    for (let i = 1; i <= maxPages; i++) {
        p.push(i);
    }

    function paginate(number) {
        setCurrentPage(number);
    }
    
    function prevPage(){
        if(currentPage !== 1) {
            setInput(input  - 1);
            setCurrentPage(currentPage - 1);
        }
    }

    function nextPage(){
        if(currentPage < maxPages) {
            setInput(input  + 1);
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <nav>
            <div>
                <button className="btnPagination" onClick={prevPage}>
                    <span className="title">Anterior</span>
                </button>
                {p.map((num) => (
                <button className="btnPagination" onClick={() => {
                    paginate(num)
                    setInput(num)
                }} key={num}>{num}
                </button>
                ))}
                <button className="btnPagination" onClick={nextPage}>
                    <span className="title">Siguiente</span>
                </button>
            </div>
        </nav>
    );

}