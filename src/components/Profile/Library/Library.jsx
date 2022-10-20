// Receives library prop and displays a user's library

import { useSelector } from "react-redux";

import LibraryItem from "./LibraryItem";
import EmptySection from "../EmptySection";

import './Library.css'

export default function Library() {

    const library = useSelector(store => store.profileReducers.library);

    return (
        <>
        {library.length === 0 ? <EmptySection section={'library'} />
                              : library.map((libraryItem) => {
                                {console.log(libraryItem)}
                                    return (
                                        <LibraryItem key={libraryItem.library_id} 
                                                     libraryItem={libraryItem} 
                                        />
                                    );
                                })}
        </>
    );
}