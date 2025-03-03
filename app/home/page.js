"use client";
import React, { useState, useEffect } from "react";
import "../component_css/home.css";
import Menubar from "../components/navbar";

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
        </div>
    );
};

export default Home;
