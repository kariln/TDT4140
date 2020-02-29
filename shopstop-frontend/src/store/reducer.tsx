import {
    ListItemProps,
    ListProps,
    StateProps,
    ListOverlayProps
} from './StoreTypes';

export const reducers = (state: StateProps, action: Action) => {
    switch (action.type) {
        case 'SET_LISTITEMS':
            return { ...state, listItems: action.payload };
        case 'ADD_LISTITEM':
            return {
                ...state,
                listItems: state.listItems.concat(action.payload)
            };

        case 'REMOVE_LISTITEM':
            return {
                ...state,
                listItems: state.listItems.filter(
                    data => data.id !== action.payload.id
                )
            };
        case 'SET_LISTS':
            return { ...state, lists: action.payload };
        case 'ADD_LIST':
            return {
                ...state,
                lists: state.lists.concat(action.payload)
            };
        // this might need rework but i think it should work now
        case 'EDIT_LIST':
            return {
                ...state,
                lists: state.lists.map(list => {
                    if (list.id === action.payload.id) return action.payload;
                    return list;
                })
            };
        case 'REMOVE_LIST':
            return {
                ...state,
                lists: state.lists.filter(data => data.id !== action.payload.id)
            }; // should change this to filter on id when we have id on lists
        case 'SET_TOKEN':
            return { ...state, token: action.payload };
        case 'SET_SELECTEDLIST':
            return { ...state, selectedList: action.payload };
        case 'TOGGLE_LISTOVERLAY':
            return {
                ...state,
                listOverlay: action.payload
            };
        default:
            return state;
    }
};

type Action =
    | { type: 'SET_LISTITEMS'; payload: ListItemProps[] }
    | { type: 'ADD_LISTITEM' | 'REMOVE_LISTITEM'; payload: ListItemProps }
    | { type: 'SET_LISTS'; payload: ListProps[] }
    | { type: 'ADD_LIST' | 'REMOVE_LIST' | 'EDIT_LIST'; payload: ListProps }
    | { type: 'SET_TOKEN'; payload: string }
    | { type: 'SET_SELECTEDLIST'; payload: number }
    | { type: 'TOGGLE_LISTOVERLAY'; payload: ListOverlayProps };
