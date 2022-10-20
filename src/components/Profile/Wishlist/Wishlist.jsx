// Receives wishlist prop and displays a user's wishlist

import { useSelector } from "react-redux";

import WishlistItem from "./WishlistItem";
import EmptySection from "../EmptySection";

import './Wishlist.css';

export default function Wishlist() {

    const wishlist = useSelector(store => store.profileReducers.wishlist);

    return (
        <>
        {wishlist.length === 0 ? <EmptySection section={'wishlist'} />
                               : wishlist.map((wishlistItem) => {
                                     return (
                                         <WishlistItem key={wishlistItem.wishlist_id} 
                                                       wishlistItem={wishlistItem} 
                                         />
                                     );
                                 })}
        </>
    );
}