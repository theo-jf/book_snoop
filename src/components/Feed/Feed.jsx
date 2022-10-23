import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import FeedItem from "./FeedItem";

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
        <>
            {feed.map((food, i) => {
                return (
                    <FeedItem key={i} food={food} />
                );
            })}
        </>
    );
}