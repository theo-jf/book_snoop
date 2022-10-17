import { useHistory } from "react-router";

// MUI Imports
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";

export default function SearchResultsItem({result}) {

    const history = useHistory();

    const viewEditions = () => {

        // Reduce key to just OpenLibrary book number
        const bookNumber = result.key.split('/')[2];
        // Go to editions
        history.push(`/search/editions/${bookNumber}`);
    }

    return (
        <Grid className="searchResultsItem" item xs={6} sm={4} md={3} lg={2}>
            <CardContent className="searchResultContent">
                <div className="coverContainer">
                    <img className="searchResultCover" onClick={viewEditions} src={`https://covers.openlibrary.org/b/olid/${result.cover_edition_key}-M.jpg`} />
                    <div className="noCoverText">image not available</div>
                </div>
                <p>{result?.title}</p> 
                <p>by {result?.author_name}</p>
                <button onClick={viewEditions}>{`View ${result?.edition_key?.length} Editions`}</button>
            </CardContent>
        </Grid>
    );
}