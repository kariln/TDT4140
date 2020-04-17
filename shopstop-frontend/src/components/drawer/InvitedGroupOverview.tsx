import React, { useEffect, useContext, useState } from 'react';
import { FlatList, Text } from 'react-native';
import getEnvVars from '../../../environment';
import { Context } from '../../store/Store';
import { GroupProps } from '../../store/StoreTypes';
import InvitedGroupOverviewItem from './InvitedGroupOverviewItem';

// Component that renders the list of groups the user has been invited to
const InvitedGroupOverview = () => {
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

    // if the user has been invited to no groups, render nothing
    if (state.invitedGroups.length === 0) return <></>;
    return (
        <>
            <Text style={{ paddingBottom: 10, alignSelf: 'center' }}>
                Groups you can join:
            </Text>
            <FlatList
                data={state.invitedGroups}
                renderItem={({ item }: { item: GroupProps }) => (
                    <InvitedGroupOverviewItem item={item} />
                )}
                keyExtractor={item => item.name}
            />
        </>
    );
};

export default InvitedGroupOverview;
