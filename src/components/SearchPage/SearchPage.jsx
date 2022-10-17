import SearchResultsItem from "./SearchResultsItem";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './SearchPage.css';

// MUI imports
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function SearchPage() {

    const dispatch = useDispatch();

    const searchResults = useSelector(store => store.searchResults);
    const queryFromHome = useSelector(store => store.queryFromHome);

    const [query, setQuery] = useState(queryFromHome);
    const [searchType, setSearchType] = useState('title');

    const submitQuery = () => {
        // Send query string and search type (title, author, none) to saga function
        dispatch({
            type: 'SAGA_SEARCH_BOOKS',
            payload: {searchType: searchType, query: query}
        });
        dispatch({
            type: 'CLEAR_QUERY_FROM_HOME'
        });
    }

    return (
        <div className="SearchResults">
            <div className="resultsPageSearchBar">
                <TextField
                    placeholder="title, author, isbn..."
                    size="small"
                    style={{width: "80%"}}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} 
                />
                <Select size="small" value={searchType} style={{width: "8%", marginLeft: "10px"}} onChange={(e) => setSearchType(e.target.value)}>
                    <MenuItem default value="title">title</MenuItem>
                    <MenuItem value="author">author</MenuItem>
                    <MenuItem value="q">everything</MenuItem>
                </Select>
                <Button onClick={submitQuery}>Search</Button>
            </div>
            {searchResults.length === 0 ? <p>Finding books, this may take a second...</p>
            : searchResults.map((result, i) => {
                return (
                    <div key={i} className="SearchResultsItem">
                        <SearchResultsItem result={result}/>
                    </div>
                );
            })}
        </div>
    );
}