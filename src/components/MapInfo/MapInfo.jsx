import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import AddressItem from "./AddressItem";

import './MapInfo.css';

// MUI Imports
import Grid from "@mui/material/Grid";

export default function MapInfo({setMapPageActive}) {

    const key = process.env.REACT_APP_API_KEY;

    const dispatch = useDispatch();

    const exitDetails = () => {

        setMapPageActive(false);
        setAddressPlaceId('ChIJvbt3k5Azs1IRB-56L4TJn5M');
        
        dispatch({
            type: 'CLEAR_ADDRESSES'
        });
    }

    const addresses = useSelector(store => store.addresses);

    // If no addresses exist, default to Minneapolis view
    const [addressPlaceId, setAddressPlaceId] = useState('ChIJvbt3k5Azs1IRB-56L4TJn5M');

    // Prop value to highlight selected address and remove highlight from others
    const [highlightedAddressId, setHighlightedAddressId] = useState('')

    return (
        <>
            <p className="mapsTitle">{addresses.length} locations found</p>
            <button className="closeMapButton" onClick={exitDetails}>x</button>
            <iframe
                className="map"
                width="90%"
                height="60%"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=place_id:${addressPlaceId}`}
                allowFullScreen>
            </iframe>
            {addresses.length != 0 ?
            // FIX SCROLL ISSUE
            // <Grid className="addressListGrid" overflow='auto' justifyContent="space-evenly" alignContent="center" container rowSpacing={5} columnSpacing={5}>
            <div className="addressListGrid">
                {addresses.map((address, i) => {
                    return (
                        <AddressItem key={address.id} 
                                     highlightedAddressId={highlightedAddressId}
                                     setHighlightedAddressId={setHighlightedAddressId}
                                     setAddressPlaceId={setAddressPlaceId} 
                                     address={address}
                                     isFirstItem={i === 0}
                        />
                    );
                })}
            </div>
            // </Grid> 
            : <h4 className="noLocationData">No users have saved address information on this edition</h4>}
        </>
    );
}