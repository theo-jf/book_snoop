// Receives library prop and displays a user's library

import { useState } from "react";

import { useSelector } from "react-redux";

import LibraryItem from "./LibraryItem";
import EmptySection from "../EmptySection";

import './Library.css'

export default function Library() {

    const library = useSelector(store => store.profileReducers.library);

    const [activeMapEditId, setActiveMapEditId] = useState('')

    return (
        <>
        {library.length === 0 ? <EmptySection section={'library'} />
                              : library.map((libraryItem) => {
                                    return (
                                        <LibraryItem key={libraryItem.library_id} 
                                                     libraryItem={libraryItem}
                                                     activeMapEditId={activeMapEditId} 
                                                     setActiveMapEditId={setActiveMapEditId}
                                        />
                                    );
                                })}
        </>
    );
}