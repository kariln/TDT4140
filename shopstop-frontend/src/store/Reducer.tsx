const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                [action.onElement]: action.payload
            };
        case 'ADD_DATA':
            return {
                ...state,
                [action.onElement]: state[action.onElement].concat(
                    action.payload
                )
            };
        case 'REMOVE_DATA':
            return {
                ...state,
                [action.onElement]: state[action.onElement].filter(
                    data => data.id !== action.payload
                )
            };
        case 'SET_ERROR':
            return {
                ...state,
                [action.onElement]: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;
