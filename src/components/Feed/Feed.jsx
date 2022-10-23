import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Feed() {

    const dispatch = useDispatch();

    useEffect(() => {
        // Tell saga to fetch library and wishlist history of all users
        dispatch({
            type: 'SAGA_FETCH_FEED'
        });

    }, []);

    return (
        <>
        </>
    );
}