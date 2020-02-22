import { listsReducer } from './listsReducer';
import { listItemsReducer } from './listItemsReducer';
import { tokenReducer } from './tokenReducer';

const mainReducer = ({ lists, listItems, token }, action) => {
    return {
        lists: listsReducer(lists, action),
        listItems: listItemsReducer(listItems, action),
        token: tokenReducer(token, action)
    };
};

export default mainReducer;
