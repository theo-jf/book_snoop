import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

const fetchFeed = () => {
    try {
        const feedResults = yield axios.get('/api/feed');
        console.log('FEEED', feedResults.data);

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