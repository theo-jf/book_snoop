// Receives library prop and displays a user's library

import { useSelector } from "react-redux";

import LibraryItem from "./LibraryItem";

import './Library.css'

export default function Library() {

    const library = useSelector(store => store.profileReducers.library);

    return (
        <>
        {library.map((libraryItem) => {
            {console.log(libraryItem)}
            return (
                <LibraryItem key={libraryItem.library_id} libraryItem={libraryItem} />
            );
        })}
        </>
    );
}