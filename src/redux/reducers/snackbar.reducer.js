import { combineReducers } from 'redux';

const isSnackbarOpen = (state = false, action) => {
    switch (action.type) {
        case 'OPEN_SNACKBAR':
            return true;
        case 'CLOSE_SNACKBAR':
            return false;
    }
    return state;
}

const snackbarSeverity = (state = '', action) => {
    switch (action.type) {
        case 'SET_SNACKBAR_ERROR':
            return 'error';
        case 'SET_SNACKBAR_SUCCESS':
            return 'success';
    }
    return state;
}

    // Reducer variables to show / hide snackbars
    // Add to library success / failure
    // Add to wishlist success / failure
    // Switch to library success / failure
    // Edit location success / failure
    // Saving new condition success / failure?? 
    // Other places where an alert is too much (search errors?)
    // Find all alerts and judge if they should be snackbars

const snackbarMessage = (state = '', action) => {
    switch (action.type) {
        case 'LIBRARY_ADDITION_FAILURE':
            return 'Error adding to library';
        case 'LIBRARY_ADDITION_SUCCESS':
            return 'Added to library';
        case 'WISHLIST_ADDITION_FAILURE':
            return 'Error adding to wishlist';
        case 'WISHLIST_ADDITION_FAILURE':
            return 'Added to wishlist';
    }
    return state;
}

export default combineReducers({

  });