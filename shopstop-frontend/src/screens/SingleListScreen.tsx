import React from 'react';
import { RouteProp } from '@react-navigation/native';
import List from '../components/List';

// These lines below makes a new type for the route prop which we use in interface.
type RootStackParamList = {
    list: { title: string };
};
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'list'>;

export interface SingleListInterface {
    route: ProfileScreenRouteProp;
}

const SingleList: React.FC<SingleListInterface> = props => {
    return <List title={props.route.params.title} />;
};

export default SingleList;
