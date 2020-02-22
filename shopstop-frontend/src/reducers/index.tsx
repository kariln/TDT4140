import { listsReducer } from './listsReducer';
import { listItemsReducer } from './listItemsReducer';
import { tokenReducer } from './tokenReducer';
import { StateProps } from '../store/StoreTypes';
import { ListProps, ListItemProps } from '../store/StoreTypes';

const mainReducer = (state: StateProps, action: Action) => {
    return {
        lists: listsReducer(state.lists, action),
        listItems: listItemsReducer(state.listItems, action),
        token: tokenReducer(state.token, action)
    };
};

type Action = {
    type: string;
};

export default mainReducer;
