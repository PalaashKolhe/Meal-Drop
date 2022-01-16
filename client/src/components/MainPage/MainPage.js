// main imports
import { React, Component } from 'react'
import axios from "axios";

// css imports
import "../../global.css";
import "./MainPage.css";

// Root imports
import Button from '@mui/material/Button';
import PostingTile from './Components/PostingTile';
import Geocode from "react-geocode";
import SimpleMap from './Components/GoogleMap';

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(process.env.REACT_APP_GCP_KEY);
// set response language. Defaults to english.
Geocode.setLanguage("en");
// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postings: [],
      latlng: [],
    };
  }

  componentDidMount() {
    this.getPostings();
  }

  getPostings = async () => {
    const getPostingsURL = `http://localhost:5000/posting/all`;
    await axios.get(getPostingsURL)
      .then(res => {
        this.setState({ postings: res.data }, () => this.getLatLng());
      }).catch(err => {
        console.log("ERROR: Posting retrieval failed ", err);
      });
  }

  getLatLng = () => {
    var latlng = [];
    this.state.postings.forEach(async (posting) => {
      Geocode.fromAddress(posting.fromRestaurantAddress)
        .then((res) => {
          var indLatlng = res.results[0].geometry.location;
          // console.log(res.results[0].geometry.location);
          latlng.push({ "lat": indLatlng.lat, "lng": indLatlng.lng, "name": posting.fromRestaurantName });
          this.forceUpdate();
        })
    })
    this.setState({ latlng: latlng });
  }

  render() {
    var postings = this.state.postings;
    var latlng = this.state.latlng;
    return (
      <div className='container flex-column center-center' >
        <div className="flex-row space-between welcome-banner">
          <div>
            Welcome!
          </div>
          <Button variant="outlined">
            Manage Personal Info
          </Button>
        </div>
        <div className='flex-row space-between start main-container'>
          {postings.length !== 0 && (
            <>
              <div className='postings-row'>
                <Button variant="contained" sx={{ width: "100%", height: "45px" }}>Create a Posting</Button>
                {
                  postings.map((posting, index) => {
                    return <PostingTile key={index} postingData={posting} />
                  })
                }
              </div>
              {latlng.length !== 0 && (
                <div className='maps-row'>
                  <SimpleMap latlng={this.state.latlng} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  }
}

export default MainPage;