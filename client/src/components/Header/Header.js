import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../../components/Logo/Logo";

// import { Link } from "react-router-dom";
// By importing the Header.css file, it is added to the DOM whenever this component loads

function Header() {
    return (

        <section className="container">
            <div className="top-bar">
                <div className="top-bar-left">
                    <header><Logo /></header>
                    <div className="allLinks">
                    <div className="links">
                    <Link to="/Profile">Profile</Link>
                    </div>
                    <div className="matches">
                    <Link to="/Matches">Matches</Link>
                    </div>
                    <div className="chat">
                    <Link to="Chat">Chat</Link>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header;