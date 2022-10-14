// Receives wishlist prop and displays a user's wishlist

import { useSelector } from "react-redux";

import WishlistItem from "./WishlistItem";

import './Wishlist.css';

export default function Wishlist() {

    const wishlist = useSelector(store => store.profileReducers.wishlist);

    return (
        <>
        {wishlist.map((wishlistItem) => {
            return (
                <WishlistItem wishlistItem={wishlistItem} />
            );
        })}
        </>
    );
}