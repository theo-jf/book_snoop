import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 

// MUI Imports
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";

export default function EditionsListItem({edition, setMapPageActive}) {

    const dispatch = useDispatch();

    const user = useSelector(store => store.user);
    const currentAuthor = useSelector(store => store.currentAuthor);

    const [justAddedToLibrary, setJustAddedToLibrary] = useState(false);
    const [justAddedToWishlist, setJustAddedToWishlist] = useState(false);

    const addToLibrary = () => {
        console.log('CURRENT AUTHOR', currentAuthor)
        dispatch({
            type: 'SAGA_ADD_TO_LIBRARY',
            payload: {
                        title: edition.title,
                        author: currentAuthor,
                        isbn: (edition.isbn_13 ? edition.isbn_13[0] || edition.isbn_13 : edition.isbn_10[0]),
                        cover: edition.physical_format,
                        publisher: edition.publishers[0] || '',
                        year: edition.publish_date || edition?.publish_date[0] || ''
                    }
        });
        setJustAddedToLibrary(true);
    }

    const addToWishlist = () => {
        dispatch({
            type: 'SAGA_ADD_TO_WISHLIST',
            payload: {
                        title: edition.title,
                        author: currentAuthor,
                        isbn: (edition.isbn_13 ? edition.isbn_13[0] || edition.isbn_13 : edition.isbn_10[0]),
                        cover: edition.physical_format || '',
                        publisher: edition.publishers[0] || '',
                        year: edition.publish_date || edition?.publish_date[0] || ''
                     }
        });
        setJustAddedToWishlist(true);
    }

    // Show maps page popup
    const seeMore = () => {
        setMapPageActive(true);
        
        // Get addresses associated with this book's isbn
        dispatch({
            type: 'SAGA_FETCH_ADDRESSES',
            payload: edition.isbn_13[0] || edition.isbn_13 || 
            edition.isbn_10[0] || edition.isbn_10
        })
    }

    return (
        <Grid className="editionsListItem" item xs={6} sm={4} md={3} lg={2}>
            <CardContent className="editionContent">
                <div className="coverContainer">
                    <img className="editionCover" alt="image not available" src={`https://covers.openlibrary.org/b/isbn/${edition.isbn_10}-M.jpg`} />
                    <div className="noCoverText">image not available</div>
                </div>
                <p>isbn: {edition?.isbn_13 ? edition?.isbn_13 : edition?.isbn_10}</p>
                <p>publisher: {edition?.publishers}</p>
                <p>{edition?.physical_format}</p>
                <p>{edition?.publish_date}</p>
                {user.id ? <><button onClick={addToLibrary}>{justAddedToLibrary ? 'Add Another Copy To Library' : 'Add To Library'}</button>
                        <button onClick={addToWishlist}>{justAddedToWishlist ? 'Add Another Copy To Wishlist' : 'Add To Wishlist'}</button></>
                        : null}
                <button onClick={seeMore}>See More</button>
            </CardContent>
        </Grid>
    );
}