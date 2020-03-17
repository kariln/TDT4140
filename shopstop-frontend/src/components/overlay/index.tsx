import React, { useContext } from 'react';
import { Context } from '../../store/Store';
import AddList from './AddList';
import EditList from './EditList';
import AddGroup from './AddGroup';

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
