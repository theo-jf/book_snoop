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

function* fetchNewAddressData(action) {
    // You cannot send a text search request to maps from the front end
    const query = action.payload.query;
    const updateId= action.payload.id;
    console.log(query, 'id:', updateId);
    try {
        const newAddressesData = yield axios.get(`/api/newaddress?query=${query}`);

        // Split up formatted_address string from google api --> "999 Street Street, City, State 55555, Country"
        const separatedAddress = yield newAddressesData.data.results[0].formatted_address.split(',');
        const stateAndZip = yield separatedAddress[2].split(' ');

        const newAddressObject = {
            updateId: updateId,
            name: newAddressesData.data.results[0].name,
            street_address: separatedAddress[0],
            city: separatedAddress[1],
            state: stateAndZip[1],
            zip: stateAndZip[2],
            googleMaps_placeId: newAddressesData.data.results[0].place_id             
        }

        // if (confirm('Is this the right address?', newAddressObject)) {
        //     console.log('new ADDY OBJECT:', newAddressObject);
        // }

        yield put ({
            type: 'SAGA_UPDATE_LIBRARY_LOCATION',
            payload: {newAddressObject: newAddressObject}
        })
    } catch (error) {
        console.log(error);
        alert('Error fetching new address details');
    }
}

export default function* addressesSaga() {
    yield takeLatest('SAGA_FETCH_ADDRESSES', fetchAddresses);
    yield takeLatest('SAGA_SET_NEW_ADDRESS', fetchNewAddressData);
}