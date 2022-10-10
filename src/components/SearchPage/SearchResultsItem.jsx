import { useHistory } from "react-router";

export default function SearchResultsItem({result}) {

    // const dispatch = useDispatch();
    const history = useHistory();

    const viewEditions = () => {

        // Reduce key to just OpenLibrary book number
        const bookNumber = result.key.split('/')[2];
        // Go to editions
        history.push(`/search/editions/${bookNumber}`);
    }

    return (
        <>
            <img onClick={viewEditions} src={`https://covers.openlibrary.org/b/olid/${result.cover_edition_key}-M.jpg`} />
            <p>title: {result?.title}, author: {result?.author_name}</p>
            <button onClick={viewEditions}>{`View ${result?.edition_key?.length} Editions`}</button>
        </>
    );
}