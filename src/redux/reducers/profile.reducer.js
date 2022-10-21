import { combineReducers } from 'redux';

const library = (state = [], action) => {
    switch (action.type) {
        case 'SET_LIBRARY':
            return action.payload;
    }
    return state;
}

const wishlist = (state = [], action) => {
    switch (action.type) {
        case 'SET_WISHLIST':
            return action.payload;
    }
    return state;
}

const profileView = (state = 'library', action) => {
    switch (action.type) {
        case 'VIEW_LIBRARY':
            return 'library';
        case 'VIEW_WISHLIST':
            return 'wishlist';
    }
    return state
}

export default combineReducers({
    library,
    wishlist,
    profileView
});