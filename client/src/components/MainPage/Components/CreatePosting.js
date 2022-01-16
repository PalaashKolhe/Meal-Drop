// Main imports
import { Button, TextField } from '@mui/material';
import { React, Component } from 'react'

// Root Imports
import AddressContainer from '../../Shared/AddressContainer';

// css imports
import "./CreatePosting.css";

class CreatePostingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: "",
      city: "",
      province: "",
      postalCode: "",
      country: "",
      pickupTimeBegin: "",
      pickupTimeEnd: "",
    };
  }

  changeValue = (value, param) => {
    this.setState({ [value]: param });
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  submitForm() {
    var { street, city, province, postalCode, country } = this.state;
    var overallAddress = street + city + province + postalCode + country;

    var createPostingURL = `${process.env.RREACT_APP_HOST_URL}posting/create`;

    axios.post(createPostingURL, {
      fromRestaurantAddress: overallAddress,
      pickupTimeBegin: this.state.pickupTimeBegin,
      pickupTimeEnd: this.state.pickupTimeEnd
    }).then(res => {
      console.log("Posting Successfully Created!");
    }).catch(err => {
      console.log("Error: ", err);
    })
  }

  render() {
    return (
      <div className="modal-container">
        <div className="modal">
          <div className="flex-row" style={{ width: "100%", justifyContent: "space-between" }}>
            <div className="modal-title">Create a Posting</div>
            <img src="images/close-button.svg" className='close-image' onClick={() => this.props.changeValue("toggleModal", false)} />
          </div>
          <div className="flex-row" style={{ width: "100%", justifyContent: "space-between" }}>
            <div className='flex-column create-posting-left'>
              <AddressContainer changeValue={this.changeValue.bind(this)} />
              <TextField onClick={() => { this.setState({ pickupTimeBegin: event.target.value }) }} className="pickup-period" fullWidth size="small" label="Pickup Start Period (MM:HR)" />
              <TextField onClick={() => { this.setState({ pickupTimeEnd: event.target.value }) }} className="pickup-period" fullWidth size="small" label="Pickup End Period (MM:HR)" />
            </div>
            <div className='flex-column create-posting-left'>
              <TextField className="pickup-notes" multiline fullWidth rows={6} size="large" label="Pickup Notes" />
            </div>
          </div>
          <Button onClick={() => this.submitForm()} variant="contained" sx={{ width: "50px" }} className="create-posting">
            Create
          </Button>
        </div>
      </div>
    )
  }
}

export default CreatePostingModal;

