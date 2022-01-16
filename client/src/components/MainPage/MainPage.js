import { React, Component } from 'react'
import "../../global.css";
import "./MainPage.css";
import Button from '@mui/material/Button';


class MainPage extends Component {

    managePersonalInfo = () => {

    }
    render() {
        return (
            <div className='container flex-column center-center' >
                <div className="flex-row space-between welcome-banner">
                    <div>
                        Welcome!
                    </div>
                    <Button variant="outlined" onClick={() => this.managePersonalInfo()}>
                        Manage Personal Info
                    </Button>
                </div>
                <div className='postings-row'>

                </div>
            </div>
        )
    }
}

export default MainPage;