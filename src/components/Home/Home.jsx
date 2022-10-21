// Home search bar here
// Using this search bar redirects the user to SearchPage
import * as React from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI Imports
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import './Home.css';

export default function Home() {

    // Reducer variables to show / hide snackbars
    // Add to library success / failure
    // Add to wishlist success / failure
    // Switch to library success / failure
    // Edit location success / failure
    // Saving new condition success / failure?? 
    // Other places where an alert is too much (search errors?)
    // Find all alerts and judge if they should be snackbars

    const history = useHistory();
    const dispatch = useDispatch();

    const [searchInput, setSearchInput] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchInput != '') {
            goToSearch();
        }
    }

    const goToSearch = () => {
        dispatch({
            type: 'SAGA_SEARCH_BOOKS',
            payload: {searchType: 'title', query: searchInput}
        });
        dispatch({
            type: 'SET_QUERY_FROM_HOME',
            payload: searchInput
        });
        history.push('/search');
        setSearchInput('');
    }

    return (
        <div className="home">
            <h1>Book Snoop</h1>
            <div>
                <TextField onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)} 
                    className="homeSearchBar"
                    style={{width: "80%"}}
                    size="small"/>

                <Button style={{color: "slategray"}} onClick={goToSearch}>Search</Button>
            </div>
        </div>
    );
}