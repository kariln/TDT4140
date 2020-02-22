import React, { createContext, useReducer } from 'react';
import reducers from '../reducers';
import { StateProps } from './StoreTypes';

const initialState: StateProps = {
    lists: [],
    listItems: [],
    token: null
};

type Props = {
    children: JSX.Element;
};

const Store = (props: Props) => {
    const [state, dispatch] = useReducer(reducers, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {props.children}
        </Context.Provider>
    );
};

export const Context = createContext(initialState);
export default Store;
