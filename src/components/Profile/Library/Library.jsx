// Receives library prop and displays a user's library

import { useSelector } from "react-redux";

import LibraryItem from "./LibraryItem";

import './Library.css'

export default function({library}) {

    const library = useSelector(store => store.profileReducers.library);

    return (
        <>
        {library.map((libraryItem) => {
            <LibraryItem key={libraryItem.id} libraryItem={libraryItem} />
        })}
        </>
    );
}