// Home search bar here
// Using this search bar redirects the user to SearchPage
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI Imports
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import './Home.css';

export default function Home() {

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