import { ListItemProps } from '../store/StoreTypes';

export const listItemsReducer = (state: ListItemProps[], action: Action) => {
    switch (action.type) {
        case 'SET_LISTITEMS':
            return action.payload;
        case 'ADD_LISTITEM':
            return state.concat(action.payload);

        case 'REMOVE_LISTITEM':
            state.filter(data => data.id !== action.payload.id);

        default:
            return state;
    }
};

type Action =
    | { type: 'SET_LISTITEMS'; payload: ListItemProps[] }
    | { type: 'ADD_LISTITEM' | 'REMOVE_LISTITEM'; payload: ListItemProps };
