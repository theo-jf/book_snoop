// Receives prop of individual book
// Route to EditLibraryItem here

import { useState } from "react";
import { useDispatch } from "react-redux";

// MUI Imports
import Grid from "@mui/material/Grid";

import EditLibraryItemLocation from "./EditLibraryItemLocation";

export default function LibraryItem({libraryItem, activeMapEditId, setActiveMapEditId}) {

    const dispatch = useDispatch();

    const [inLocationEditView, setInLocationEditView] = useState(false);

    const goToEditView = () => {
        setActiveMapEditId(libraryItem.library_id)
        setInLocationEditView(true);
    }

    const updateCondition = (e) => {
        let newCondition = e.target.value;
        dispatch({
            type: 'SAGA_UPDATE_LIBRARY_CONDITION',
            payload: {id: libraryItem.library_id, condition: newCondition}
        });
    }

    const deleteLibraryItem = () => {
        // Confirm with user, then send delete request
        if(confirm('Delete from library?')){
            setInLocationEditView(false);
            dispatch({
                type: 'SAGA_DELETE_LIBRARY_ITEM',
                payload: libraryItem.library_id
            });
        }
    }

    // ~Library Card~ :P
    return (        
        <Grid item xs={12} sm={6} md={3} lg={2} className="libraryItem">
            <img className="libraryItemImg" src={`https://covers.openlibrary.org/b/isbn/${libraryItem.isbn}-M.jpg`} />
            <p>{libraryItem.title}</p>
            <p>by {libraryItem.author}</p>
            <p>{libraryItem.isbn}</p>
            <p>{libraryItem.publisher}, {libraryItem.year} {libraryItem.cover}</p>
            <p><select defaultValue={libraryItem.condition || '😵‍💫'} onChange={(e) => updateCondition(e)}>
                {/* <option disabled selected={libraryItem.condition ? false : true} value={undefined}>Choose!</option> */}
                <option disabled hidden value={'😵‍💫'}>Select condition</option>
                <option value="F">Like New</option>
                <option value="NF">Near Fine</option>
                <option value="VG">Very Good</option>
                <option value="G">Good</option>
                <option value="FR">Fair</option>
                <option value="P">Poor</option>
            </select>
            {libraryItem.condition ? 'condition' : null}</p>
            {inLocationEditView && activeMapEditId === libraryItem.library_id ? <EditLibraryItemLocation setInLocationEditView={setInLocationEditView} libraryItem={libraryItem} />
                                : libraryItem.name ? <>
                                                        <p>Found at {libraryItem.name} in {libraryItem.city}, {libraryItem.state}</p> 
                                                        <p><button onClick={goToEditView}>Edit Location</button></p>
                                                     </>
                                                   : <button onClick={goToEditView}>Select location found</button>}
            <button onClick={deleteLibraryItem}>Delete From Library</button>
        </Grid>
    );
}