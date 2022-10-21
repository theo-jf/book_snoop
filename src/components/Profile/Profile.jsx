// This component requires users to be logged in
    // Else --> redirect to Login

// Default profile view contains the library component

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Component imports
import Library from "./Library/Library";
import Wishlist from "./Wishlist/Wishlist";
import LogOutButton from "../LogOutButton/LogOutButton";

// MUI Imports 
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import './Profile.css';

const drawerWidth = 240;

export default function Profile() {


    const userInfo = useSelector(store => store.user);
    const profileView = useSelector(store => store.profileView);

    // You might need to pass these as props ... we shall see
    // const library = useSelector(store => store.profileReducers.library);
    // const wishlist = useSelector(store => store.profileReducers.wishlist);

    const dispatch = useDispatch();

    // Moved to store, no longer needed in local
    // const [inLibrary, setInLibrary] = useState(true);
    // const [inWishlist, setInWishList] = useState(false);
    
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
        dispatch({type: 'VIEW_LIBRARY'});
        let libraryNav = document.getElementById('libraryNav');
        libraryNav.style.color = 'black';
        let wishlistNav = document.getElementById('wishlistNav');
        wishlistNav.style.color = 'gray';
        window.scrollTo(0, 0);
    }

    // Turns wishlist button to 'selected' color, all others to unselected 
    const seeWishlist = () => {
        dispatch({type: 'VIEW_WISHLIST'});
        let libraryNav = document.getElementById('libraryNav');
        libraryNav.style.color = 'gray';
        let wishlistNav = document.getElementById('wishlistNav');
        wishlistNav.style.color = 'black';
        window.scrollTo(0, 0);
    }

    return (
        <Box sx={{ display: 'flex' }} className="profile">
            <div className="profileNav">
                <div className="profileAvatarBorder">
                    <img alt="profile picture here :)" src='' className="profileAvatar" />
                </div>
                <h2 className="profileUsername">{userInfo.username}</h2>
                <p id="libraryNav" onClick={seeLibrary}>library</p>
                <p id="wishlistNav" onClick={seeWishlist}>wishlist</p>
                {/* <LogOutButton /> */}
            </div>
            <Box id="topOfPage" className="profileMainView">
                {profileView === 'library' ? <h2 className="profileMainViewTitle">Library</h2> : <h2 className="profileMainViewTitle">Wishlist</h2>}
                <Box sx={{ flexGrow: 1 }}>
                    <Grid justifyContent="left" container rowSpacing={5} columnSpacing={5} className="profileMainViewSection">
                        {profileView === 'library' ? <Library /> : <Wishlist />}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}