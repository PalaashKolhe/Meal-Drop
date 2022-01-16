// Main imports
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
      country: ""
    };
  }

  changeValue = (value, param) => {
    this.setState({ [value]: param });
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <div className="modal-container">
        <div className="modal">
          <div className="flex-row" style={{width: "100%", justifyContent: "space-between"}}>
            <div className="modal-title">Create a Posting</div>
            <img src="images/close-button.svg" className='close-image' onClick={() => this.props.changeValue("toggleModal", false)}/>
          </div>
          <div className='flex-column create-posting-left'>
            <AddressContainer changeValue={this.changeValue.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}

export default CreatePostingModal;

