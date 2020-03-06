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

const initialState: StateProps = {
    lists: [],
    listItems: [],
    authentication: initialAuthenticationState,
    listOverlay: initialOverlayState,
    username: null,
    selectedList: null,
    selectedGroup: 1,

    // This is only here because typescript wanted it
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
