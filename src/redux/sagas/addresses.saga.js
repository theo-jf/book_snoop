import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAddresses(action) {
    const bookIsbn = action.payload
    console.log('book isbn:', bookIsbn);
    try {
        const addresses = yield axios.get(`/api/addresses/?isbn=${bookIsbn}`);
        console.log('addresses:', addresses.data);
        yield put ({
            type: 'SET_ADDRESSES',
            payload: addresses.data
        })
    } catch (error) {
        console.log(error);
        alert('Error loading details');
    }
}


export default function* addressesSaga() {
    yield takeLatest('SAGA_FETCH_ADDRESSES', fetchAddresses);
}