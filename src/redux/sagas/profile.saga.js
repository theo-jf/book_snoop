import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

function* fetchLibrary() {
    try {
        const library = yield axios.get('/api/library');
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
        const wishlist = yield axios.get('/api/wishlist');
        yield put ({
            type: 'SET_WISHLIST',
            payload: wishlist.data
        });
    } catch (error) {
        console.log(error);
        alert('Error fetching wishlist, please try again')
    }
}

function* updateLibraryCondition(action) {
    try {
        console.log('UPDATING CONDITION', action.payload)
        yield axios.put(`/api/library/${action.payload.id}`, action.payload);
        yield put({
            type: 'SAGA_FETCH_USER_LIBRARY'
        });
    } catch (error) {
        console.log(error);
        alert('Error updating library');
    }
}

function* updateLibraryLocation(action) {
    try {
        yield axios.put(`/api/library/${action.payload.newAddressObject.updateId}`, action.payload);
        yield put({
            type: 'SAGA_FETCH_USER_LIBRARY'
        });
    } catch (error) {
        console.log(error);
        alert('Error updating library');
    }
}

function* deleteLibraryItem(action) {
    try {
        yield axios.delete(`/api/library/${action.payload}`);
        yield put({
            type: 'SAGA_FETCH_USER_LIBRARY'
        });
    } catch (error) {
        console.log(error);
        alert('Error deleting library item');
    }
}

function* moveWishlistItemToLibrary(action) {
    try {
        yield axios.post('api/library/fromwishlist', {id: action.payload});
        yield put({
            type: 'SAGA_FETCH_USER_WISHLIST'
        });
        yield put({
            type: 'SAGA_FETCH_USER_LIBRARY'
        })
    } catch (error) {
        console.log(error);
        alert('Error moving to library');
    }
}

function* deleteWishlistItem(action) {
    try {
        yield axios.delete(`/api/wishlist/${action.payload}`);
        yield put({
            type: 'SAGA_FETCH_USER_WISHLIST'
        });
    } catch (error) {
        console.log(error);
        alert('Error deleting wishlist item');
    }
}

export default function* profileSaga() {
    yield takeLatest('SAGA_FETCH_USER_LIBRARY', fetchLibrary);
    yield takeLatest('SAGA_FETCH_USER_WISHLIST', fetchWishlist);
    yield takeLatest('SAGA_UPDATE_LIBRARY_CONDITION', updateLibraryCondition);
    yield takeLatest('SAGA_UPDATE_LIBRARY_LOCATION', updateLibraryLocation);
    yield takeLatest('SAGA_DELETE_LIBRARY_ITEM', deleteLibraryItem);
    yield takeLatest('SAGA_MOVE_TO_LIBRARY', moveWishlistItemToLibrary);
    yield takeLatest('SAGA_DELETE_WISHLIST_ITEM', deleteWishlistItem);
}