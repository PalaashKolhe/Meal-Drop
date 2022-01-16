import React from 'react';
import { Link } from "react-router-dom";
import "./LandingPage.css";
import { Button } from '@mui/material';
import "../../global.css";

const buttonTheme = {marginRight: "50px", color: "black", border: "2px solid black"}
const LinkTheme = {textDecoration: "None", color: "black"};

const LandingPage = () => {
    return (
        <div id='landingpage'>
            <div id="buttons" >
                <Button variant="outlined" style={buttonTheme}>
                    <Link style={LinkTheme} to="/main">Browse As Guest</Link>
                </Button>
                <Button variant="outlined" style={buttonTheme} >
                    <Link to="/auth" style={LinkTheme}>Sign-Up / Login</Link>
                </Button>
            </div>
            <div id="text">
                <h1>MealDrop</h1>
                <h3>Reducing Food Waste. One Meal at a Time.</h3>
            </div>
        </div>
    )
}

export default LandingPage;