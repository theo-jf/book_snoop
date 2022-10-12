// Receives prop of individual book
// Route to EditLibraryItem here

import { useState } from "react";

export default function LibraryItem({libraryItem}) {

    const [inEditView, setInEditView] = useState(false);

    const saveChanges = () => {
        setInEditView(false);
    }

    const deleteLibraryItem = () => {
        if(confirm('Delete from library?')){
            setInEditView(false);
        }
    }

    // ~Library Card~ :P
    return (        
        <div className="libraryItem">
            <img className="libraryItemImg" src={`https://covers.openlibrary.org/b/isbn/${libraryItem.isbn}-M.jpg`} />
            {inEditView ? <p><button onClick={saveChanges}>Save Changes</button><button onClick={deleteLibraryItem}>Remove From Library</button></p> 
                        : <p className="editButton" onClick={() => setInEditView(true)}>•••</p>}
            <p>{libraryItem.title} ({libraryItem.edition})</p>
            <p>by {libraryItem.author}</p>
            <p>{libraryItem.isbn}</p>
            <p>{libraryItem.publisher}, {libraryItem.year} {libraryItem.cover}</p>
            {inEditView ? <p>edit</p> : <p>{libraryItem.condition} condition</p>}
            {inEditView ? <p>edit</p> : <p>Found at {libraryItem.googleMaps_placeId}</p>}
        </div>
    );
}