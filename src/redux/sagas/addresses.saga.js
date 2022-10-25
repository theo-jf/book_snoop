import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAddresses(action) {
    const bookIsbn = action.payload
    try {
        const addresses = yield axios.get(`/api/addresses/?isbn=${bookIsbn}`);
        yield put ({
            type: 'SET_ADDRESSES',
            payload: addresses.data
        })
    } catch (error) {
        console.log(error);
        // alert('Error loading details');
        yield put ({
            type: 'SET_SNACKBAR',
            payload: {
                isOpen: true,
                severity: 'error',
                message: 'Error loading details'
            }
        });
    }
}

function* fetchNewAddressData(action) {
    // You cannot send a text search request to maps from the front end
    const query = action.payload.query;
    const updateId= action.payload.id;
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

        yield put ({
            type: 'SAGA_UPDATE_LIBRARY_LOCATION',
            payload: {newAddressObject: newAddressObject}
        });
    } catch (error) {
        console.log(error);
        alert('Error fetching new address details');
        yield put ({
            type: 'SET_SNACKBAR',
            payload: {
                isOpen: true,
                severity: 'error',
                message: 'Error fetching new address data'
            }
        });
    }
}

export default function* addressesSaga() {
    yield takeLatest('SAGA_FETCH_ADDRESSES', fetchAddresses);
    yield takeLatest('SAGA_SET_NEW_ADDRESS', fetchNewAddressData);
}