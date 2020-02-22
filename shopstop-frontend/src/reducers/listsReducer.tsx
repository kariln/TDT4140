import { ListProps } from '../store/StoreTypes';

export const listsReducer = (state: ListProps[], action: Action) => {
    switch (action.type) {
        case 'SET_LISTS':
            return action.payload;
        case 'ADD_LIST':
            return state.concat(action.payload);
        case 'REMOVE_LIST':
            state.filter(data => data.name !== action.payload.name); // should change this to filter on id when we have id on lists

        default:
            return state;
    }
};

type Action =
    | { type: 'SET_LISTS'; payload: ListProps[] }
    | { type: 'ADD_LIST' | 'REMOVE_LIST'; payload: ListProps };
