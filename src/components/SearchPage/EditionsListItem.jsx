import { useDispatch } from "react-redux"; 

export default function EditionsListItem({edition, setMapPageActive}) {

    const dispatch = useDispatch();

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
            <button onClick={seeMore}>See More</button>
        </div>
    );
}