export default function addresses(state = [], action) {
    switch (action.type) {
        case 'SET_ADDRESSES':
            return action.payload;
        case 'CLEAR_ADDRESSES':
            return [];
    }
    return state;
}