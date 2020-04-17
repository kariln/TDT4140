import React, { useContext } from 'react';
import { Context } from '../../store/Store';
import AddList from './AddList';
import EditList from './EditList';
import AddGroup from './AddGroup';

// decides which overlay to show, depending on the value of state.overlay.type
const Overlay = () => {
    const [state] = useContext(Context);

    switch (state.overlay.type) {
        case 'ADD_LIST':
            return <AddList />;
        case 'EDIT_LIST':
            return <EditList />;
        case 'ADD_GROUP':
            return <AddGroup />;
        default:
            return <></>;
    }
};

export default Overlay;
