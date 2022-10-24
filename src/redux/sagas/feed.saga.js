import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

function* fetchFeed() {
    try {
        // In the future, send user zip code as a query
        const feedResults = yield axios.get('/api/feed');
        yield put ({
            type: 'SET_FEED',
            payload: feedResults.data
        });
    } catch (error) {
        console.log(error);
        yield put({
            type: 'SET_SNACKBAR',
            payload: {
                isOpen: true,
                severity: 'error',
                message: 'Error loading social feed'
            }
        })
    }
}

export default function* feedSaga() {
    yield takeLatest ('SAGA_FETCH_FEED', fetchFeed);
}