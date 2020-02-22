export const tokenReducer = (state: string | null, action: Action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            action.payload;
        default:
            return state;
    }
};

type Action = {
    type: string;
    payload: string;
};
