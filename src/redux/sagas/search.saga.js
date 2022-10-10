import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

function* searchBooks(action) {
    // action.payload is a string
    console.log('IN SEARCH BOOKS!!!!')
    const query = action.payload.query;
    const searchType = action.payload.searchType;
    console.log('Search query:', action.payload.query);
    console.log('Search type:', action.payload.searchType);

    try{
        const searchResults = yield axios.get(`/api/search/?type=${searchType}&query=${query}`)
        yield put({
            type: 'SET_SEARCH_RESULTS',
            payload: searchResults.data
        });
    } catch(error){
        console.log(error);
        alert('Search error, please try again');
    }
}

export default function* searchSaga() {
    yield takeLatest('SAGA_SEARCH_BOOKS', searchBooks);
}