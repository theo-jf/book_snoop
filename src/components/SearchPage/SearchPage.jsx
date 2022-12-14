import SearchResultsItem from "./SearchResultsItem";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './SearchPage.css';

// MUI imports
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from "@mui/material/Grid";

export default function SearchPage() {

    const dispatch = useDispatch();

    const searchResults = useSelector(store => store.searchResults);
    const queryFromHome = useSelector(store => store.queryFromHome);

    const [query, setQuery] = useState(queryFromHome);
    const [searchType, setSearchType] = useState('title');

    const [loadingTimeUp, setLoadingTimeUp] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoadingTimeUp(true)
        }, 4000);
    });

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && query != '' && searchType != '') {
            submitQuery();
        }
    }

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
                    style={{width: "80%", marginBottom: '10px'}}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} 
                    onKeyDown={(e) => handleKeyDown(e)} 
                />
                <Select size="small" value={searchType} style={{width: "140px", marginLeft: "10px"}} onChange={(e) => setSearchType(e.target.value)}>
                    <MenuItem default value="title">title</MenuItem>
                    <MenuItem value="author">author</MenuItem>
                    <MenuItem value="q">everything</MenuItem>
                </Select>
                <Button style={{color: "slategray"}} onClick={submitQuery}>Search</Button>
            </div>
            <div className="searchResultsContainer">
                <Grid justifyContent="space-evenly" container rowSpacing={5} columnSpacing={5}>
                    {searchResults.length === 0 && queryFromHome != '' ? loadingTimeUp ? <p>Nothing found</p> : <p>Finding books, this may take a second...</p>
                    : searchResults.map((result, i) => {
                        return (
                            <SearchResultsItem key={i} result={result}/>
                        );
                    })}
                </Grid>
            </div>
        </div>
    );
}