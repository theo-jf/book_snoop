import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

function* fetchEditions(action) {
    const bookKey = action.payload;
    console.log('work route:', bookKey);
    try {
        const editionsResults = yield axios.get(`/api/editions/?workroute=${bookKey}`);
        console.log('Editions:')
        console.log('editions:', editionsResults.data);
        yield put ({
            type: 'SET_EDITIONS_RESULTS',
            payload: editionsResults.data
        });

        // Get author key of first edition result
        const authorKey = editionsResults.data[0].authors[0].key;
        const currentAuthor = yield axios.get(`https://openlibrary.org${authorKey}.json`);

        // Set current author
        yield  put ({
            type: 'SET_CURRENT_AUTHOR',
            payload: currentAuthor.data.name
        })

    } catch (error) {
        console.log(error);
        alert('Error fetching editions, please try again');
    }
}

export default function* editionsSaga() {
    yield takeLatest('SAGA_FETCH_EDITIONS', fetchEditions);
}