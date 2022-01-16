import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from "react-router-dom";
import { tConvert } from '../MainPage/Components/PostingTile';
import "../../global.css";
import "./ViewPost.css";
import { Button } from '@mui/material';


const ViewPost = () => {
    

    const URL = process.env.REACT_APP_HOST_URL;
    const { id } = useParams();
    
    const [Post, setPost] = useState({});
    const history = useHistory();

    useEffect(() => {
        axios.get(`${URL}posting/one/${id}`,  )
            .then( res => {
                setPost(res.data);
            })
            .catch( err => {
                alert(err.response);
            })
    }, [])

    const handlePickUp = () => {
        axios.post(`${URL}posting/delete`, {id: id,})
            .then(res => {
                history.push("/main");
            })
            .catch(e => {
                alert(e.response);
            })
    }

    const PostInfo = Object.keys(Post).length ? (<div id="info">
                                <h1>{Post.fromRestaurantName}</h1>
                                <h3>{Post.fromRestaurantAddress}</h3>
                                <p>Pickup Date: {Post.updatedAt}</p>
                                <p>Pickup Time: {tConvert(Post.pickupTimeBegin)} - {tConvert(Post.pickupTimeEnd)}</p>
                                <hr style={{color: "black", width: "100%" }} />
                                <p>{Post.notes}</p>
                                <hr style={{color: "black", width: "100%" }} />
                                <Button variant='contained' style={{marginTop: "10px"}} onClick={e => handlePickUp()} >I can pick this up!</Button>
                                <Button variant='contained' style={{marginTop: "10px"}} onClick={e => alert("Uber hasn't helped us yet.")}>Schedule Uber Delivery!</Button>
                                <Button variant='contained' disabled style={{marginTop: "10px"}}>Use one of our drivers!</Button>
                            </div>) : (
                        <h3>No post found!</h3>) ;

    return (
        <>
            <div id="viewpost-page">
                {PostInfo}
                <div id="embedded_map">

                </div>
            </div>
            <Link to="/main">
                <Button variant='contained' style={{marginTop: "10px", backgroundColor: "black", textDecoration: "none"  }}>Back To All Posting</Button>
            </Link>
        </>
    )
}

export default ViewPost
