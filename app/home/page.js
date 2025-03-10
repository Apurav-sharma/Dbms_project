"use client";
import React, { useState, useEffect } from "react";
import "../component_css/home.css";
import Menubar from "../components/navbar";
import "../component_css/cards.css";
import { useRouter } from "next/navigation";
import axios from "axios";

const Home = () => {
    const [user, setuser] = useState("Apurav");
    const router = useRouter();

    useEffect(() => {
        const user = sessionStorage.getItem("email");

        if (!user) {
            router.push("/login");
        }
        const fetch = async () => {
            const res = await axios.get(`/api/users/${user}`)
            if (res && res.data) {
                sessionStorage.setItem("phone", res.data.phone);
                sessionStorage.setItem("fname", res.data.fname);
            }
        }

        fetch();
        const fname = sessionStorage.getItem("fname");

        if (fname) {
            setuser(fname);
        } else {
            setuser(user);
        }
    }, []);

    const checkBalance = async () => {
        const email = sessionStorage.getItem("email");
        if (!email) {
            router.push("/login");
        }

        sessionStorage.setItem("self", 1);
        router.push("/pin");

        // const balance = await axios.post('/api/payment', {email});

        // console.log(balance);
    }

    const MakePayment = () => {
        sessionStorage.setItem("self", 0);
        router.push("/contact");
    }

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
                <div className="card" onClick={MakePayment}>
                    <div className="card-details">
                        <p className="text-title">Make Payment</p>
                        {/* <p className="text-body"></p> */}
                    </div>
                    {/* <button className="card-button">More info</button> */}
                </div>
                <div className="card" onClick={checkBalance}>
                    <div className="card-details">
                        <p className="text-title">Check Your Bank Account</p>
                        {/* <p className="text-body">Here are the details of the card</p> */}
                    </div>
                    {/* <button className="card-button">More info</button> */}
                </div>
                {/* <div className="card">
                    <div className="card-details">
                        <p className="text-title">Card title</p>
                        <p className="text-body">Here are the details of the card</p>
                    </div>
                    <button className="card-button">More info</button>
                </div> */}
            </div>
        </div>
    );
};

export default Home;