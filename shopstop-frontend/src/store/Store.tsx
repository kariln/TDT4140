import React, { createContext, useReducer } from 'react';
import { reducers } from './reducer';
import { StateProps } from './StoreTypes';

const initialState: StateProps = {
    lists: [],
    listItems: [],
    token: null,

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
