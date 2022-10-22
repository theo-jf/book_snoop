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

// Cloudinary
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { fill } from "@cloudinary/url-gen/actions/resize";

import CldImageUploader from "./CldImageUploader";

import './Profile.css';

// const drawerWidth = 240;

export default function Profile() {

    // Keys
    const cloudName = process.env.REACT_APP_CLOUDINARY_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_PRESET;

    // Cloudinary configuration
    const cld = new Cloudinary({
        cloud: {
            cloudName: `${cloudName}`,
            uploadPreset: `${uploadPreset}`
        }
    });


    const [uploadedImage, setUploadedImage] = useState([]);

    const userInfo = useSelector(store => store.user);
    const profileView = useSelector(store => store.profileReducers.profileView);

    const dispatch = useDispatch();
    
    // Fetch library and wishlist info on profile load
    useEffect(() => {
        dispatch({
            type: 'SAGA_FETCH_USER_LIBRARY'
        })
        dispatch({
            type: 'SAGA_FETCH_USER_WISHLIST'
        })

        // Ensure proper button highlighted
        if (profileView === 'library') {
            highlightLibraryButton();
        } else if (profileView === 'wishlist') {
            highlightWishlistButton();
        }
    }, []);

    // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
    const myImage = cld.image(`cld-sample-5`); 
    myImage.resize(fill().width(250).height(250));

    const onImageUploadHandler = (publicId) => {
        setUploadedImage([publicId]);
    };

    const showAddProfilePictureButton = () => {
        let button = document.getElementById('imageUploader');
        button.style.visibility = 'visible';
        let picture = document.getElementById('profilePicture');
        picture.style.filter = 'brightness(70%)'
    }

    const hideAddProfilePictureButton = () => {
        let button = document.getElementById('imageUploader');
        button.style.visibility = 'hidden';
        let picture = document.getElementById('profilePicture');
        picture.style.filter = 'brightness(100%)'
    }

    const highlightLibraryButton = () => {
        let libraryNav = document.getElementById('libraryNav');
        libraryNav.style.color = 'black';
        let wishlistNav = document.getElementById('wishlistNav');
        wishlistNav.style.color = 'gray';
    }

    const highlightWishlistButton = () => {
        let libraryNav = document.getElementById('libraryNav');
        libraryNav.style.color = 'gray';
        let wishlistNav = document.getElementById('wishlistNav');
        wishlistNav.style.color = 'black';
    }

    // Turns library button to 'selected' color, all others to unselected 
    const seeLibrary = () => {
        dispatch({type: 'VIEW_LIBRARY'});
        highlightLibraryButton();
        window.scrollTo(0, 0);
    }

    // Turns wishlist button to 'selected' color, all others to unselected 
    const seeWishlist = () => {
        dispatch({type: 'VIEW_WISHLIST'});
        highlightWishlistButton();
        window.scrollTo(0, 0);
    }

    return (
        <Box sx={{ display: 'flex' }} className="profile">
            <div className="profileNav">
                <div onMouseEnter={showAddProfilePictureButton}
                     onMouseLeave={hideAddProfilePictureButton} 
                     className="profileAvatarBorder">
                    <AdvancedImage id="profilePicture" className="profilePicture" cldImg={myImage} />
                    <CldImageUploader
                        cloud_name={cld.cloudinaryConfig.cloud.cloudName}
                        upload_preset={cld.cloudinaryConfig.cloud.uploadPreset}
                        onImageUpload={(publicId) => onImageUploadHandler(publicId)}
                    />
                </div>
                <h4>Welcome,</h4>
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