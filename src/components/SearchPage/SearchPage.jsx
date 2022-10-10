import SearchResultsItem from "./SearchResultsItem";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function SearchPage() {

    const dispatch = useDispatch();

    const searchResults = useSelector(store => store.searchResults);

    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState('title')

    const submitQuery = () => {
        // Send query string and search type (title, author, none) to saga function
        dispatch({
            type: 'SAGA_SEARCH_BOOKS',
            payload: {searchType: searchType, query: query}
        })
    }

    return (
        <div className="SearchResults">
            <input
                placeholder="title, author, isbn..."
                value={query}
                onChange={(e) => setQuery(e.target.value)} 
            />
            <select onChange={(e) => setSearchType(e.target.value)}>
                <option default value="title">title</option>
                <option value="author">author</option>
                <option value="q">everything</option>
            </select>
            <button onClick={submitQuery}>Search</button>
            {searchResults.map((result, i) => {
                return (
                    <div key={i} className="SearchResultsItem">
                        <SearchResultsItem result={result}/>
                    </div>
                );
            })}
        </div>
    );
}