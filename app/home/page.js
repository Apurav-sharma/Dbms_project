"use client";
import React, { useState, useEffect } from "react";
import "../component_css/home.css";
import Menubar from "../components/navbar";
import "../component_css/cards.css";
import { useRouter } from "next/navigation";

const Home = () => {
    const [user, setuser] = useState("Apurav");
    const router = useRouter();

    useEffect(() => {
        const user = sessionStorage.getItem("email");

        if (!user) {
            router.push("/login");
        }
        setuser(user);
    }, []);

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