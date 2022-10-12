// This component requires users to be logged in
    // Else --> redirect to Login

// Default profile view contains the library component

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Component imports
import Library from "./Library/Library";
import Wishlist from "./Wishlist/Wishlist";
import LogOutButton from "../LogOutButton/LogOutButton";

import './Profile.css';

export default function Profile() {

    const userInfo = useSelector(store => store.user);
    const library = useSelector(store => store.profileReducers.library);
    const wishlist = useSelector(store => store.profileReducers.wishlist);

    const dispatch = useDispatch();

    const [inLibrary, setInLibrary] = useState(true);
    const [inWishlist, setInWishList] = useState(false);
    
    // Fetch library and wishlist info on profile load
    useEffect(() => {
        dispatch({
            type: 'SAGA_FETCH_USER_LIBRARY'
        })
        dispatch({
            type: 'SAGA_FETCH_USER_WISHLIST'
        })
    }, [])

    // Turns library button to 'selected' color, all others to unselected 
    const seeLibrary = () => {
        setInLibrary(true);
        setInWishList(false);
        let libraryNav = document.getElementById('libraryNav');
        libraryNav.style.color = 'black';
        let wishlistNav = document.getElementById('wishlistNav');
        wishlistNav.style.color = 'gray';
    }

    // Turns wishlist button to 'selected' color, all others to unselected 
    const seeWishlist = () => {
        setInWishList(true);
        setInLibrary(false);
        let libraryNav = document.getElementById('libraryNav');
        libraryNav.style.color = 'gray';
        let wishlistNav = document.getElementById('wishlistNav');
        wishlistNav.style.color = 'black';
    }

    return (
        <div className="profile">
            <div className="profileNav">
                <img className="profileAvatar" />
                <h2>{userInfo.username}</h2>
                <p id="libraryNav" onClick={seeLibrary}>library</p>
                <p id="wishlistNav" onClick={seeWishlist}>wishlist</p>
                {/* <LogOutButton /> */}
            </div>
            <div className="profileMainView">
                {inLibrary && !inWishlist ? <h2>Library</h2> : <h2>Wishlist</h2>}
                <div className="profileMainViewSection">
                    {inLibrary && !inWishlist ? <Library library={library} /> : <Wishlist wishlist={wishlist} />}
                </div>
            </div>
        </div>
    );
}