// Main imports
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from "react-router-dom";
import { Button } from '@mui/material';
import Geocode from "react-geocode";

// Root imports
import { tConvert } from '../MainPage/Components/PostingTile';
import SimpleMap from '../MainPage/Components/GoogleMap';

// css
import "../../global.css";
import "./ViewPost.css";
import "../MainPage/MainPage.css";

const ViewPost = () => {
  const URL = process.env.REACT_APP_HOST_URL;
  const { id } = useParams();

  const [Post, setPost] = useState({});
  const history = useHistory();
  const [latlng, setLatlng] = useState([]);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    axios.get(`${URL}posting/one/${id}`,)
      .then(res => {
        setPost(res.data);
        getLatLng({ "address": res.data.fromRestaurantAddress, "name": res.data.fromRestaurantName });
      })
      .catch(err => {
        alert(err.response);
      })
  }, [])

  const handlePickUp = () => {
    axios.post(`${URL}posting/delete`, { id: id, })
      .then(res => {
        history.push("/confirmed");
      })
      .catch(e => {
        alert(e.response);
      })
  }

  const getLatLng = (addressObject) => {
    var latlng = [];
    Geocode.fromAddress(addressObject.address)
      .then((res) => {
        var indLatlng = res.results[0].geometry.location;
        // console.log(res.results[0].geometry.location);
        latlng.push({ "lat": indLatlng.lat, "lng": indLatlng.lng, "name": addressObject.name });
        setLatlng(latlng);
        setRerender(!rerender);
        console.log(latlng);
      })
  }

  const PostInfo = Object.keys(Post).length ? (<div id="info">
    <h1 className="restaurant-name">{Post.fromRestaurantName}</h1>
    <h3 className="restaurant-address">{Post.fromRestaurantAddress}</h3>
    <p className="pickup"><b>Pickup Date:</b> {new Date(Post.updatedAt).toDateString()}</p>
    <p className="pickup"><b>Pickup Time:</b> {tConvert(Post.pickupTimeBegin)} - {tConvert(Post.pickupTimeEnd)}</p>
    <hr style={{ color: "black", width: "100%" }} />
    <p><b>Notes:</b> {Post.notes == "" ? "None" : Post.notes}</p>
    <hr style={{ color: "black", width: "100%" }} />
    <Button variant='contained' style={{ marginTop: "10px" }} onClick={e => handlePickUp()} >I can pick this up</Button>
    <Button variant='contained' style={{ marginTop: "10px", backgroundColor: "black" }} onClick={e => alert("Uber hasn't helped us yet.")}>Schedule Uber Delivery</Button>
    <Button variant='contained' disabled style={{ marginTop: "10px" }}>Use one of our drivers</Button>
  </div>) : (
    <h3>Loading...</h3>);

  return (
    <>
      <div className='container flex-column center-center' style={{width: "80%"}} >
        <div id="viewpost-page" style={{ justifyContent: 'space-between' }} className='flex-row '>
          <div style={{ width: '49%', height: "100%" }}>
            {PostInfo}
          </div>
          <div className="maps-row" style={{padding: "0"}}>
            <SimpleMap latlng={latlng} />
          </div>
        </div>
        <Link to="/main">
          <Button variant='contained' style={{ marginTop: "40px", textDecoration: "none", width: '25%' }}>Back</Button>
        </Link>
      </div>
    </>
  )
}

export default ViewPost
