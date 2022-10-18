import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import AddressItem from "./AddressItem";

import './MapInfo.css'

export default function MapInfo({setMapPageActive}) {

    const key = process.env.REACT_APP_API_KEY;

    const dispatch = useDispatch();

    const exitDetails = () => {

        setMapPageActive(false);
        setAddressPlaceId('ChIJvbt3k5Azs1IRB-56L4TJn5M')
        
        dispatch({
            type: 'CLEAR_ADDRESSES'
        });
    }

    const addresses = useSelector(store => store.addresses);

    // For now, Minneapolis is the default view
    const [addressPlaceId, setAddressPlaceId] = useState('ChIJvbt3k5Azs1IRB-56L4TJn5M');


    return (
        <>
            <h1>MAP SURPRISE</h1>
            <button onClick={exitDetails}>X</button>
            <div>
                {addresses.length != 0 ? 
                addresses.map(address => {
                    return (
                        <AddressItem key={address.id} setAddressPlaceId={setAddressPlaceId} address={address}/>
                    );
                }) : <p>No users have saved address information on this edition</p> }
            </div>
            <iframe
                width="90%"
                height="60%"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=place_id:${addressPlaceId}`}
                allowFullScreen>
            </iframe>
        </>
    );
}