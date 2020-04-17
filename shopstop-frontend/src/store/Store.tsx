import React, { createContext, useReducer } from 'react';
import { reducers } from './reducer';
import { StateProps } from './StoreTypes';

export const initialOverlayState = {
    visible: false,
    type: '',
    id: null
};

export const initialAuthenticationState = {
    isLoading: true,
    isSignout: false,
    token: null
};

// This is the initial global state
export const initialState: StateProps = {
    lists: [],
    listItems: [],
    groups: [],
    invitedGroups: [],
    authentication: initialAuthenticationState,
    overlay: initialOverlayState,
    username: null,
    selectedList: null,
    selectedGroup: null,
    tutorial: {
        deleteMode: false,
        viewBoughtMode: false,
        editMode: false,
        toggleBought: false
    },
    removeList: [],

    // Makes us able to iterate through the state.
    *[Symbol.iterator]() {
        let properties = Object.keys(this);
        for (let i of properties) {
            yield [i, this[i]];
        }
    }
};

type Props = {
    children: JSX.Element;
};

const Store = (props: Props) => {
    const [state, dispatch] = useReducer(reducers, initialState);
    return (
        <Context.Provider value={[state, dispatch] as any}>
            {props.children}
        </Context.Provider>
    );
};

export const Context = createContext(initialState);
export default Store;
