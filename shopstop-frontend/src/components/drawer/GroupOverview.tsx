import React, { useEffect, useContext, useState } from 'react';
import { FlatList } from 'react-native';
import getEnvVars from '../../../environment';
import { Context } from '../../store/Store';
import { GroupProps } from '../../store/StoreTypes';
import GroupOverviewItem from './GroupOverviewItem';

// component that renders the list of groups the user is part of
const GroupOverview = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        if (state.authentication.token)
            fetch(`${getEnvVars.apiUrl}groups/current_user_groups/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${state.authentication.token}`
                }
            })
                .then(result => result.json())
                .then(data => {
                    dispatch({
                        type: 'SET_GROUPS',
                        payload: data
                    });
                    // Sets the first group to the selected group on app load
                    if (data[0] && !state.selectedGroup)
                        dispatch({
                            type: 'SET_SELECTEDGROUP',
                            payload: data[0].id
                        });
                })
                .then(() => setIsLoading(false))
                .catch(e => console.log(e));
    }, [dispatch, state.authentication.token, state.selectedGroup]);

    if (isLoading) return <></>;

    return (
        <FlatList
            data={state.groups}
            renderItem={({ item }: { item: GroupProps }) => (
                <GroupOverviewItem item={item} />
            )}
            keyExtractor={item => item.name}
        />
    );
};

export default GroupOverview;
