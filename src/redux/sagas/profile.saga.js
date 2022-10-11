import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

function* fetchLibrary() {
    try {
        const library = axios.get('api/library');
        yield put ({
            type: 'SET_LIBRARY',
            payload: library.data
        });
    } catch (error) {
        console.log(error);
        alert('Error fetching library, please try again');
    }
}

function* fetchWishlist() {
    try {
        const wishlist = axios.get('api/wishlist');
        yield put ({
            type: 'SET_WISHLIST',
            payload: wishlist.data
        });
    } catch (error) {
        console.log(error);
        alert('Error fetching wishlist, please try again')
    }
}

export default function* profileSaga() {
    takeLatest('SAGA_FETCH_USER_LIBRARY', fetchLibrary);
    takeLatest('SAGA_FETCH_USER_WISHLIST', fetchWishlist)
}