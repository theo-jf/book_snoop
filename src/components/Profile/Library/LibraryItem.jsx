// Receives prop of individual book
// Route to EditLibraryItem here

import { useState } from "react";
import { useDispatch } from "react-redux";

export default function LibraryItem({libraryItem}) {

    const dispatch = useDispatch();

    const [inLocationEditView, setInLocationEditView] = useState(false);
    const [location, setLocation] = useState(libraryItem.googleMaps_placeId);

    const goToEditView = () => {
        setInLocationEditView(true);
    }

    const updateCondition = (e) => {
        let newCondition = e.target.value;
        dispatch({
            type: 'SAGA_UPDATE_LIBRARY_CONDITION',
            payload: {id: libraryItem.id, condition: newCondition}
        });
    }

    const updateLocation = () => {
        // Send updated location
        setInEditView(false);
        dispatch({
            type: 'SAGA_UPDATE_LIBRARY_LOCATION',
            payload: {id: libraryItem.id, location: location}
        })
    }

    const deleteLibraryItem = () => {
        // Confirm with user, then send delete request
        if(confirm('Delete from library?')){
            setInEditView(false);
            dispatch({
                type: 'SAGA_DELETE_LIBRARY_ITEM',
                payload: libraryItem.id
            });
        }
    }

    // ~Library Card~ :P
    return (        
        <div className="libraryItem">
            <img className="libraryItemImg" src={`https://covers.openlibrary.org/b/isbn/${libraryItem.isbn}-M.jpg`} />
            <p>{libraryItem.title} ({libraryItem.edition})</p>
            <p>by {libraryItem.author}</p>
            <p>{libraryItem.isbn}</p>
            <p>{libraryItem.publisher}, {libraryItem.year} {libraryItem.cover}</p>
            <select defaultValue={libraryItem.condition} onChange={(e) => updateCondition(e)}>
                <option value="F">Like New</option>
                <option value="NF">Near Fine</option>
                <option value="VG">Very Good</option>
                <option value="G">Good</option>
                <option value="FR">Fair</option>
                <option value="P">Poor</option>
            </select>
            <p>{libraryItem.condition} condition</p>
            {inLocationEditView ? <p><input onChange={(e) => setLocation(e.target.value)} value={location} /> <button onClick={updateLocation}>Save Changes</button></p> 
                                : <p>Found at {libraryItem.googleMaps_placeId} <button onClick={goToEditView}>Edit Location</button></p>}
        </div>
    );
}