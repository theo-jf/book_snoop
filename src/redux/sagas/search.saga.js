import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

function* searchBooks(action) {
    // action.payload is a string
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

function* addBookToLibrary(action) {
    // action.payload is a full book object,
    //  so it can be added to saved_books if not already there
    const newBook = action.payload;

    try {
        yield axios.post('/api/library', newBook);
    } catch (error) {
        console.log(error);
        alert('Error adding to library, please try again');
    }
}

function* addBookToWishlist(action) {
    // action.payload is a full book object
    //  so it can be added to saved_books if not already there
    const newBook = action.payload;

    try {
        yield axios.post('/api/wishlist', newBook);
    } catch (error) {
        console.log(error);
        alert('Error adding to wishlist, please try again');
    }
}

export default function* searchSaga() {
    yield takeLatest('SAGA_SEARCH_BOOKS', searchBooks);
    yield takeLatest('SAGA_ADD_TO_LIBRARY', addBookToLibrary);
    yield takeLatest('SAGA_ADD_TO_WISHLIST', addBookToWishlist);
}