import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 

export default function EditionsListItem({edition, setMapPageActive}) {

    const dispatch = useDispatch();

    const user = useSelector(store => store.user);

    const [justAddedToLibrary, setJustAddedToLibrary] = useState(false);
    const [justAddedToWishlist, setJustAddedToWishlist] = useState(false);

    const addToLibrary = () => {
        dispatch({
            type: 'SAGA_ADD_TO_LIBRARY',
            payload: {
                        title: edition.title,
                        author: edition.author,
                        isbn: edition.isbn_10[0] || edition.isbn_13[0],
                        edition: edition.edition,
                        cover: edition.physical_format,
                        publisher: edition.publishers[0],
                        year: edition.publish_date || edition.publish_date[0]
                    }
        });
        setJustAddedToLibrary(true);
    }

    const addToWishlist = () => {
        dispatch({
            type: 'SAGA_ADD_TO_WISHLIST',
            payload: {
                        title: edition.title,
                        author: edition.author,
                        isbn: edition.isbn_10[0] || edition.isbn_13[0],
                        edition: edition.edition,
                        cover: edition.physical_format,
                        publisher: edition.publishers[0],
                        year: edition.publish_date || edition.publish_date[0]
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
            payload: edition.isbn_13[0] || edition.isbn_13[0] || 
                     edition.isbn_13 || edition.isbn_10
        })
    }

    return (
        <div className="editionsListItem">
            <img src={`https://covers.openlibrary.org/b/isbn/${edition.isbn_10}-M.jpg`} />
            <p>isbn: {edition?.isbn_13 ? edition?.isbn_13 : edition?.isbn_10}</p>
            <p>publisher: {edition?.publishers}</p>
            <p>{edition?.physical_format}</p>
            <p>{edition?.publish_date}</p>
            {/* <button>add to wishlist</button>
            <button>add to library</button> */}
            {user.id ? <><button onClick={addToLibrary}>{justAddedToLibrary ? 'Add Another Copy To Library' : 'Add To Library'}</button>
                       <button onClick={addToWishlist}>{justAddedToWishlist ? 'Add Another Copy To Wishlist' : 'Add To Wishlist'}</button></>
                     : null}
            <button onClick={seeMore}>See More</button>
        </div>
    );
}