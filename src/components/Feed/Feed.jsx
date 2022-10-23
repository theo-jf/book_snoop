import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import FeedItem from "./FeedItem";

// MUI Imports
import Box from "@mui/material/Box";

import './Feed.css'

export default function Feed() {

    const dispatch = useDispatch();

    const feed = useSelector(store => store.feed);

    useEffect(() => {
        // Tell saga to fetch library and wishlist history of all users
        dispatch({
            type: 'SAGA_FETCH_FEED'
        });

    }, []);

    return (
        <div className="feedDiv">
            <Box className="feed" width={'60vw'} height={'50vh'} overflow={'scroll'}>
                {feed.map((food, i) => {
                    return (
                        <FeedItem key={i} food={food} />
                    );
                })}
            </Box>
        </div>
    );
}