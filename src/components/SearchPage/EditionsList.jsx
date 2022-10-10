import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import './EditionsList.css';

import EditionsListItem from './EditionsListItem';
import MapInfo from '../MapInfo/MapInfo.jsx';

export default function EditionsList() {

    const dispatch = useDispatch();
    const params = useParams();

    // Fetch the editions on page load using route parameter
    useEffect(() => {
        dispatch({
            type: 'SAGA_FETCH_EDITIONS',
            payload: params.bookNumber
        });

        console.log('editionResults!:', editionsResults)

        // Clear editions reducer upon leaving
        return () => {
            dispatch({
                type: 'CLEAR_EDITIONS_RESULTS'
            })
        }

    }, [params.bookNumber]);


    const editionsResults = useSelector(store => store.editionsResults);
    const [mapPageActive, setMapPageActive] = useState(false);

    return (
        <>
            <div className={mapPageActive ? "popupBackground" : null}>
                <p>Editions!</p>
                {editionsResults?.map((edition, i) => {
                    return (
                        <EditionsListItem key={i} edition={edition} setMapPageActive={setMapPageActive}/>
                    );
                })}
            </div>
            <div className={mapPageActive ? "popupForeground" : "popupHidden"}>
                <MapInfo setMapPageActive={setMapPageActive} />
            </div>
        </>
    );
}