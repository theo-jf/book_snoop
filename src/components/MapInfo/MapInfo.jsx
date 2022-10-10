import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import AddressItem from "./AddressItem";

import './MapInfo.css'

export default function MapInfo({setMapPageActive}) {

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

    // const api_key = process.env.API_KEY;


    return (
        <>
            <h1>MAP SURPRISE</h1>
            <button onClick={exitDetails}>X</button>
            <div>
                {addresses.map(address => {
                    return (
                        <AddressItem key={address.id} setAddressPlaceId={setAddressPlaceId} address={address}/>
                    );
                })}
            </div>
            <iframe
                width="500"
                height="400"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCd2EX_Yf13vpP4o8cz0Z7rd9vTy0uswZ4&q=place_id:${addressPlaceId}`}
                allowFullScreen>
            </iframe>
        </>
    );
}