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

export default combineReducers({
    library,
    wishlist,
});