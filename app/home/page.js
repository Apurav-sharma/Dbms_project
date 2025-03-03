"use client";
import React, { useState, useEffect } from "react";
import "../component_css/home.css";
import Menubar from "../components/navbar";
import "../component_css/cards.css";

const Home = () => {
    const [user, setuser] = useState("Apurav");

    return (
        <div>
            <Menubar />
            <div className="body">
                <div className="greetbox">
                    <h1 className="greet">Welcome to Payment Gateway</h1>
                    <h3 className="greet2">Hello, {user}</h3>
                </div>
            </div>
            
            <div className="card-container">
                <div className="card">
                    <div className="card-details">
                        <p className="text-title">Card title</p>
                        <p className="text-body">Here are the details of the card</p>
                    </div>
                    <button className="card-button">More info</button>
                </div>
                <div className="card">
                    <div className="card-details">
                        <p className="text-title">Card title</p>
                        <p className="text-body">Here are the details of the card</p>
                    </div>
                    <button className="card-button">More info</button>
                </div>
                <div className="card">
                    <div className="card-details">
                        <p className="text-title">Card title</p>
                        <p className="text-body">Here are the details of the card</p>
                    </div>
                    <button className="card-button">More info</button>
                </div>
            </div>
        </div>
    );
};

export default Home;