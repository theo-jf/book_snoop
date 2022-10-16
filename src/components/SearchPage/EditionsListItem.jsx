import { useDispatch, useSelector } from "react-redux"; 

export default function EditionsListItem({edition, setMapPageActive}) {

    const dispatch = useDispatch();

    const user = useSelector(store => store.user);

    const addToLibrary = () => {
        dispatch({
            type: 'SAGA_ADD_TO_LIBRARY',
            payload: {
                        title: edition.title,
                        author: edition.author,
                        isbn: edition.isbn_10 || edition.isbn_13,
                        edition: edition.edition,
                        cover: edition.physical_format,
                        publisher: edition.publishers,
                        year: edition.publish_date
                    }
        });
    }

    const addToWishlist = () => {
        dispatch({
            type: 'SAGA_ADD_TO_WISHLIST',
            payload: {
                        title: edition.title,
                        author: edition.author,
                        isbn: edition.isbn_10 || edition.isbn_13,
                        edition: edition.edition,
                        cover: edition.physical_format,
                        publisher: edition.publishers,
                        year: edition.publish_date
                     }
        });
    }

    // Show maps page popup
    const seeMore = () => {
        setMapPageActive(true);
        
        // Get addresses associated with this book's isbn
        dispatch({
            type: 'SAGA_FETCH_ADDRESSES',
            payload: edition.isbn_13
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
            {user.id ? <><button onClick={addToLibrary}>Add To Library</button>
                       <button onClick={addToWishlist}>Add To Wishlist</button></>
                     : null}
            <button onClick={seeMore}>See More</button>
        </div>
    );
}