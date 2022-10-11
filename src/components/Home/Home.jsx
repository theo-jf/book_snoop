// Home search bar here
// Using this search bar redirects the user to SearchPage
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

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
        history.push('/search');
        setSearchInput('');
    }

    return (
        <div className="home">
            <h1>Book Snoop</h1>
            <input onChange={(e) => setSearchInput(e.target.value)}
                   onKeyDown={(e) => handleKeyDown(e)} />
            <button onClick={goToSearch}>Search</button>
        </div>
    );
}