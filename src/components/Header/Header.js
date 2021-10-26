import React from "react";
import './Header.css';

export default ({black}) =>{
    return(
    <header className={black ? 'black' : ''}>
        <div className="header--logo">
            <a href="/">
                <img src="https://i.imgur.com/OIz9tdk.png"/>
            </a>
        </div>
        <div className="header--user">
            <a href="/">
                <img src="https://i.imgur.com/NZO9XRg.png" alt="Usuário"/>
            </a>
        </div>
    </header>
    );
}