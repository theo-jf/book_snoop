import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function EditLibraryItemLocation({setInLocationEditView, libraryItem}) {

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
    }

    const discardChanges = () => {
        setInLocationEditView(false);
    }

    const updateLocation = () => {
        // Send updated location
        setInLocationEditView(false);
        // dispatch({
        //     type: 'SAGA_UPDATE_LIBRARY_LOCATION',
        //     payload: {id: libraryItem.id, location: location}
        // })
    }

    return (
        <>
            <p><input placeholder="search for a location" onChange={(e) => changeLocation(e)} value={location} /></p>
            {/* If there's no exiting placeId, default to minneapolis */}
            <iframe
                width="500"
                height="400"
                referrerPolicy="no-referrer-when-downgrade"
                src={changesMade && location != '' ? `https://www.google.com/maps/embed/v1/place?key=AIzaSyCd2EX_Yf13vpP4o8cz0Z7rd9vTy0uswZ4&q=${location}`
                                 : `https://www.google.com/maps/embed/v1/place?key=AIzaSyCd2EX_Yf13vpP4o8cz0Z7rd9vTy0uswZ4&q=place_id:${libraryItem.googleMaps_placeId === '' ? 'ChIJvbt3k5Azs1IRB-56L4TJn5M' : libraryItem.googleMaps_placeId}`}
                allowFullScreen>
            </iframe>
            <p><button onClick={discardChanges}>Discard Changes</button><button onClick={updateLocation}>Save Changes</button></p>
        </>
    );
}