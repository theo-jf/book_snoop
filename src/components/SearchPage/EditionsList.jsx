import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import './EditionsList.css';

// MUI Imports
import Grid from "@mui/material/Grid";

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
        // Clear current author upon leaving
        return () => {
            dispatch({
                type: 'CLEAR_EDITIONS_RESULTS'
            });
            dispatch({
                type: 'CLEAR_CURRENT_AUTHOR'
            });
        }

    }, [params.bookNumber]);


    const editionsResults = useSelector(store => store.editionsResults);
    const [mapPageActive, setMapPageActive] = useState(false);

    // If map page is up, interaction with the edition results is disabled by class properties
    return (
        <>
            <div className={mapPageActive ? "popupBackground editionsContainer" : "editionsContainer"}>
                <h1>Editions!</h1>
                <Grid justifyContent="space-evenly" container rowSpacing={5} columnSpacing={5}>
                    {editionsResults?.map((edition, i) => {
                        return (
                            <EditionsListItem key={i} edition={edition} setMapPageActive={setMapPageActive}/>
                        );
                    })}
                </Grid>
            </div>
            <div className={mapPageActive ? "popupForeground" : "popupHidden"}>
                <MapInfo setMapPageActive={setMapPageActive} />
            </div>
        </>
    );
}