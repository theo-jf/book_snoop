export default function currentAuthor(state = '', action) {
    switch (action.type) {
        case 'SET_CURRENT_AUTHOR':
            return action.payload;
        case 'CLEAR_CURRENT_AUTHOR':
            return '';    
    }
    return state;
}