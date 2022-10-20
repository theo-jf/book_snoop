import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// MUI Imports
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function EditLibraryItemLocation({setInLocationEditView, libraryItem}) {

    const key = process.env.REACT_APP_API_KEY;

    const dispatch = useDispatch();

    // On load, fetch the address info associated with this saved book

    // If no address yet entered, default to empty string
    const [location, setLocation] = useState('');

    // Record if any changes have been made
    //  if not, placeId will be used for the maps api instead of general query
    const [changesMade, setChangesMade] = useState(false);

    const changeLocation = (e) => {
        setLocation(e.target.value);
        setChangesMade(true);
        // Call Saga function to update new location reducer with maps api
    }

    const discardChanges = () => {
        setInLocationEditView(false);
    }

    const saveUpdatedLocation = () => {

        // Confirm new string has been entered
        // **** In the server route, make queries without cities in them default to user area ***
        if (location != '') {
            dispatch({
                type: 'SAGA_SET_NEW_ADDRESS',
                payload: {id: libraryItem.library_id, query: location}
            })
            setInLocationEditView(false);
        } else if (location === '') {
            discardChanges();
        }
    }

    return (
        <div className="libraryMapPopup">
            {/* If there's no exiting placeId, default to minneapolis */}
            <TextField className="libraryMapField" size="small" fullWidth placeholder="search for a location" onChange={(e) => changeLocation(e)} value={location} />
            <iframe
                className="libraryMap"
                width="99%"
                height="60%"
                referrerPolicy="no-referrer-when-downgrade"
                src={changesMade && location != '' ? `https://www.google.com/maps/embed/v1/place?key=${key}&q=${location}`
                                                   : `https://www.google.com/maps/embed/v1/place?key=${key}&q=place_id:${libraryItem.googleMaps_placeId === '' || 
                                                                                                                        libraryItem. googleMaps_placeId === null ? 'ChIJvbt3k5Azs1IRB-56L4TJn5M' 
                                                                                                                                                                 : libraryItem.googleMaps_placeId}`}
                allowFullScreen>
            </iframe>
            <p className="libraryMapButtons"><Button onClick={discardChanges}>Discard Changes</Button><Button onClick={saveUpdatedLocation}>Save This Address</Button></p>
        </div>
    );
}