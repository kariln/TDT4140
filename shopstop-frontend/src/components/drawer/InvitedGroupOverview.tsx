import React, { useEffect, useContext, useState } from 'react';
import { FlatList } from 'react-native';
import getEnvVars from '../../../environment';
import { Context } from '../../store/Store';
import { GroupProps } from '../../store/StoreTypes';
import InvitedGroupOverviewItem from './InvitedGroupOverviewItem';

const GroupOverview = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        if (state.authentication.token)
            fetch(`${getEnvVars.apiUrl}groups/current_invited_user_groups/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${state.authentication.token}`
                }
            })
                .then(result => result.json())
                .then(data => {
                    dispatch({
                        type: 'SET_INVITEDGROUPS',
                        payload: data
                    });
                })
                .then(() => setIsLoading(false))
                .catch(e => console.log(e));
    }, [dispatch, state.authentication.token]);

    if (isLoading) return <></>;

    return (
        <FlatList
            data={state.invitedGroups}
            renderItem={({ item }: { item: GroupProps }) => (
                <InvitedGroupOverviewItem item={item} />
            )}
            keyExtractor={item => item.name}
        />
    );
};

export default GroupOverview;
