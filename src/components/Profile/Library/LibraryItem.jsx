// Receives prop of individual book
// Route to EditLibraryItem here

import { useState } from "react";

export default function LibraryItem({libraryItem}) {

    const [inEditView, setInEditView] = useState(false);

    // ~Library Card~ :P
    return (
        <div className="libraryItem">
            <img className="libraryItemImg" src={`https://covers.openlibrary.org/b/isbn/${libraryItem.isbn}-M.jpg`} />
            <p>•••</p>
            <p>{libraryItem.title} ({libraryItem.edition})</p>
            <p>by {libraryItem.author}</p>
            <p>{libraryItem.isbn}</p>
            <p>{libraryItem.publisher}, {libraryItem.year} {libraryItem.cover}</p>
            <p>{libraryItem.condition} condition</p>
            <p>Found at {libraryItem.googleMaps_placeId}</p>
        </div>
    );
}