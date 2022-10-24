import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

function* fetchEditions(action) {
    const bookKey = action.payload;
    try {
        const editionsResults = yield axios.get(`/api/editions/?workroute=${bookKey}`);
        yield put ({
            type: 'SET_EDITIONS_RESULTS',
            payload: editionsResults.data
        });

        let currentAuthor;
        // Get author key of edition result
        //  Sometimes the first result will not have a key, so looping is necessary
        for (let edition of editionsResults.data) {
            if (edition.authors) {
                const authorKey = edition.authors[0].key;
                currentAuthor = yield axios.get(`https://openlibrary.org${authorKey}.json`);
                break;
            }
        }

        // Set current author
        yield  put ({
            type: 'SET_CURRENT_AUTHOR',
            payload: currentAuthor.data.name
        })

    } catch (error) {
        console.log(error);
        // alert('Error fetching editions, please try again');
        yield put ({
            type: 'SET_SNACKBAR',
            payload: {
                isOpen: true,
                severity: 'error',
                message: 'Error fetching editions'
            }
        });
    }
}

export default function* editionsSaga() {
    yield takeLatest('SAGA_FETCH_EDITIONS', fetchEditions);
}