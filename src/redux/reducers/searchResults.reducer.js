export default function  searchResults(state = [], action) {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            console.log(action.payload);
            return action.payload;
    }
    return state;
}