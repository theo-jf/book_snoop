// Receives wishlist prop and displays a user's wishlist

import { useSelector, useDispatch } from "react-redux";

export default function Wishlist() {

    const wishlist = useSelector(store => store.profileReducers.wishlist);

    return (
        <>
        {wishlist.map((wishlistItem) => {
            
        })}
        </>
    );
}