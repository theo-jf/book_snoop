export default function snackbar(state = {
                                            isOpen: false,
                                            severity: '',
                                            message: ''
                                         },  action) {
    switch (action.type) {
        case 'SET_SNACKBAR':
            return {
                isOpen: action.payload.isOpen,
                severity: action.payload.severity,
                message: action.payload.message
            };
        case 'CLOSE_SNACKBAR':
            return {...state, isOpen: false};
    }
    return state;
};