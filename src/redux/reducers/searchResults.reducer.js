export default function  searchResults(state = [], action) {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            return action.payload;
    }
    return state;
}