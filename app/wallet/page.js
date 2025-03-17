"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Card, CardContent, Typography, CircularProgress, Alert } from "@mui/material";

const Wallet = () => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchWalletBalance = async () => {
            try {
                const email = localStorage.getItem("email");
                if (!email) {
                    setError("User email not found. Please log in.");
                    setLoading(false);
                    router.push('/login');
                    return;
                }

                const response = await axios.get(`/api/wallet/${email}`);
                console.log(response.data);


                setBalance(response.data[0].Balance);

            } catch (err) {
                setError("Failed to fetch wallet data.");
            } finally {
                setLoading(false);
            }
        };

        fetchWalletBalance();
    }, []);

    const handleTransfer = async () => {
        try {
            const email = localStorage.getItem("email");
            if (!email) {
                setError("User email not found.");
                return;
            }

            const response = await axios.post(`/api/wallet/${email}`, { email });
            setBalance(0); // Reset balance after transfer

        } catch (err) {
            setError("Transfer failed.");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <Card sx={{ minWidth: 300, padding: 2, textAlign: "center" }}>
                <CardContent>
                    <Typography variant="h5">My Wallet</Typography>

                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <Alert severity="error">{error}</Alert>
                    ) : message ? (
                        <Alert severity="info">{message}</Alert>
                    ) : (
                        <>
                            <Typography variant="h6">Balance: ₹{balance}</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ marginTop: 2 }}
                                onClick={handleTransfer}
                                disabled={balance === 0}
                            >
                                Transfer to Bank
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Wallet;