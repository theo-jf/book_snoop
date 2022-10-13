// CURRENTLY UNUSED

export default function newAddress(state = {}, action) {
    switch (action.type) {
        case 'SET_NEW_ADDRESS':
            return action.payload;
        case 'CLEAR_NEW_ADDRESS':
            return {};
    }
    return state;
}