export default function queryFromHome(state = '', action) {
    switch (action.type) {
        case 'SET_QUERY_FROM_HOME': 
            return action.payload;
        case 'CLEAR_QUERY_FROM_HOME':
            return '';
    }
    return state;
}