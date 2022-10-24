export default function editionsResults(state = [], action) {
    switch (action.type) {
        case 'SET_EDITIONS_RESULTS':
            return action.payload;
        case 'CLEAR_EDITIONS_RESULTS':
            return [];
    }
    return state;
}