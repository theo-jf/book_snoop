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
        // alert('Error fetching library, please try again');
        yield put ({
            type: 'SET_SNACKBAR',
            payload: {
                isOpen: true,
                severity: 'error',
                message: 'Error loading library'
            }
        });
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
        // alert('Error fetching wishlist, please try again');
        yield put ({
            type: 'SET_SNACKBAR',
            payload: {
                isOpen: true,
                severity: 'error',
                message: 'Error loading wishlist'
            }
        });
    }
}

function* updateLibraryCondition(action) {
    try {
        console.log('UPDATING CONDITION', action.payload)
        yield axios.put(`/api/library/${action.payload.id}`, action.payload);
        yield put({
            type: 'SAGA_FETCH_USER_LIBRARY'
        });
        // yield put ({
        //     type: 'SET_SNACKBAR',
        //     payload: {
        //         isOpen: true,
        //         severity: 'success',
        //         message: 'Condition updated'
        //     }
        // });
    } catch (error) {
        console.log(error);
        // alert('Error updating library');
        yield put ({
            type: 'SET_SNACKBAR',
            payload: {
                isOpen: true,
                severity: 'error',
                message: 'error updating condition'
            }
        });
    }
}

function* updateLibraryLocation(action) {
    try {
        yield axios.put(`/api/library/${action.payload.newAddressObject.updateId}`, action.payload);
        yield put({
            type: 'SAGA_FETCH_USER_LIBRARY'
        });
        yield put ({
            type: 'SET_SNACKBAR',
            payload: {
                isOpen: true,
                severity: 'success',
                message: 'Location updated'
            }
        });
    } catch (error) {
        console.log(error);
        // alert('Error updating library');
        yield put ({
            type: 'SET_SNACKBAR',
            payload: {
                isOpen: true,
                severity: 'error',
                message: 'error updating location'
            }
        });
    }
}

function* deleteLibraryItem(action) {
    try {
        yield axios.delete(`/api/library/${action.payload}`);
        yield put({
            type: 'SAGA_FETCH_USER_LIBRARY'
        });
        yield put ({
            type: 'SET_SNACKBAR',
            payload: {
                isOpen: true,
                severity: 'success',
                message: 'Deleted'
            }
        });
    } catch (error) {
        console.log(error);
        // alert('Error deleting library item');
        yield put ({
            type: 'SET_SNACKBAR',
            payload: {
                isOpen: true,
                severity: 'error',
                message: 'Error deleting book'
            }
        });
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
        });
        yield put ({
            type: 'SET_SNACKBAR',
            payload: {
                isOpen: true,
                severity: 'success',
                message: 'Moved to library'
            }
        });
        // Since library view is default state in store, 
        //      wishlist snackbar calls also need to set profileView to stay on wishlist
        yield put ({
            type: 'VIEW_WISHLIST'
        });
    } catch (error) {
        console.log(error);
        // alert('Error moving to library');
        yield put ({
            type: 'SET_SNACKBAR',
            payload: {
                isOpen: true,
                severity: 'error',
                message: 'Error moving to library'
            }
        });
        yield put ({
            type: 'VIEW_WISHLIST'
        });
    }
}

function* deleteWishlistItem(action) {
    try {
        yield axios.delete(`/api/wishlist/${action.payload}`);
        yield put({
            type: 'SAGA_FETCH_USER_WISHLIST'
        });
        yield put ({
            type: 'SET_SNACKBAR',
            payload: {
                isOpen: true,
                severity: 'success',
                message: 'Deleted'
            }
        });
        // Since library view is default state in store, 
        //      wishlist snackbar calls also need to set profileView to stay on wishlist
        yield put ({
            type: 'VIEW_WISHLIST'
        });
    } catch (error) {
        console.log(error);
        // alert('Error deleting wishlist item');
        yield put ({
            type: 'SET_SNACKBAR',
            payload: {
                isOpen: true,
                severity: 'error',
                message: 'Error deleting book'
            }
        });
        yield put ({
            type: 'VIEW_WISHLIST'
        });
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