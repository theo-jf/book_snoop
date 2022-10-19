// Receives prop of individual book
// Users can move items in wishlist to their library

import { useState } from "react";
import { useDispatch } from "react-redux";

// MUI Imports
import Grid from "@mui/material/Grid";

export default function WishlistItem({wishlistItem}) {

    const dispatch = useDispatch();

    const [movedToLibrary, setMovedToLibrary] = useState(false);

    const moveToLibrary = () => {
        setMovedToLibrary(true);
        dispatch({
            type: 'SAGA_MOVE_TO_LIBRARY',
            payload: wishlistItem.wishlist_id
        });
    }

    const deleteWishlistItem = () => {
        if (confirm('Delete from wishlist?')) {
            dispatch({
                type: 'SAGA_DELETE_WISHLIST_ITEM',
                payload: wishlistItem.wishlist_id
            });
        }
    }

    // If items has been moved to library, display a momentary visual indicator
    return (
        <Grid item xs={12} sm={6} md={3} lg={2} className="wishlistItem">
            { movedToLibrary ? <p>Moved to library</p> 
                             : <>
                                    <img className="wishlistItemImg" src={`https://covers.openlibrary.org/b/isbn/${wishlistItem.isbn}-M.jpg`} />
                                    <p>{wishlistItem.title}</p>
                                    <p>by {wishlistItem.author}</p>
                                    <p>{wishlistItem.isbn}</p>
                                    <p>{wishlistItem.publisher}, {wishlistItem.year} {wishlistItem.cover}</p>
                                    <button onClick={moveToLibrary}>Move To Library</button>
                                    <button onClick={deleteWishlistItem}>Delete From Wishlist</button> 
                               </>}
        </Grid>
    );
}