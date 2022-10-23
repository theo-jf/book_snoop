export default function feed(state = [], action) {
    switch (action.type) {
        case 'SET_FEED':
            return action.payload
        case 'CLEAR_FEED':
            return [];
    }
    return state;
}