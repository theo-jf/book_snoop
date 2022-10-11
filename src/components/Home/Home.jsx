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

    return (
        <div className="home">
            <h1>Book Snoop</h1>
            <input />
            <button>Search</button>
        </div>
    );
}