import {
    ListItemProps,
    ListProps,
    StateProps,
    OverlayProps,
    GroupProps,
    ListItemTutorial
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
        case 'EDIT_LISTITEM':
            return {
                ...state,
                listItems: state.listItems.map(listItem => {
                    if (listItem.id === action.payload.id)
                        return action.payload;
                    return listItem;
                })
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
            };
        case 'SET_GROUPS':
            return { ...state, groups: action.payload };
        case 'ADD_GROUP':
            return {
                ...state,
                groups: state.groups.concat(action.payload)
            };
        case 'REMOVE_GROUP':
            return {
                ...state,
                groups: state.groups.filter(
                    data => data.id !== action.payload.id
                )
            };
        case 'SET_SELECTEDLIST':
            return { ...state, selectedList: action.payload };
        case 'SET_SELECTEDGROUP':
            return { ...state, selectedGroup: action.payload };
        case 'TOGGLE_OVERLAY':
            return {
                ...state,
                overlay: action.payload
            };
        case 'SET_USER':
            return { ...state, username: action.payload };
        case 'RESTORE_TOKEN':
            return {
                ...state,
                authentication: {
                    ...state.authentication,
                    token: action.payload,
                    isLoading: false
                }
            };
        case 'SIGN_IN':
            return {
                ...state,
                authentication: {
                    ...state.authentication,
                    token: action.payload,
                    isSignOut: false
                }
            };
        case 'SIGN_OUT':
            return {
                ...state,
                authentication: {
                    ...state.authentication,
                    isSignOut: true,
                    token: null,
                    isLoading: false
                }
            };
        case 'SET_TUTORIAL_LIST':
            return {
                ...state,
                tutorial: action.payload
            };
        default:
            return state;
    }
};

type Action =
    | { type: 'SET_LISTITEMS'; payload: ListItemProps[] }
    | {
          type: 'ADD_LISTITEM' | 'REMOVE_LISTITEM' | 'EDIT_LISTITEM';
          payload: ListItemProps;
      }
    | { type: 'SET_LISTS'; payload: ListProps[] }
    | { type: 'ADD_LIST' | 'REMOVE_LIST' | 'EDIT_LIST'; payload: ListProps }
    | { type: 'SET_SELECTEDLIST'; payload: number }
    | { type: 'TOGGLE_OVERLAY'; payload: OverlayProps }
    | { type: 'SET_USER'; payload: string }
    | { type: 'SIGN_IN' | 'RESTORE_TOKEN'; payload: string }
    | { type: 'SIGN_OUT'; payload: null }
    | { type: 'SET_GROUPS'; payload: GroupProps[] }
    | { type: 'ADD_GROUP'; payload: GroupProps }
    | { type: 'REMOVE_GROUP'; payload: GroupProps }
    | { type: 'SET_SELECTEDGROUP'; payload: number }
    | { type: 'SET_TUTORIAL_LIST'; payload: ListItemTutorial };
