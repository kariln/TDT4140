import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { Overlay, Icon } from 'react-native-elements';

export interface ConfirmDeleteItemReq {
    n_ids: number;
    closeModal: (argModalState: void) => void;
    closeDeleteModalAndDelete: (argModalState: void) => void;
}
// Overlay when deleting items from a list
const ConfirmDeleteItem: React.FC<ConfirmDeleteItemReq> = props => {
    return (
        <Overlay
            isVisible
            onBackdropPress={() => props.closeModal()}
            height={100}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'stretch'
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>
                    <Text
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            fontSize: 20
                        }}
                    >
                        Delete {props.n_ids} item{props.n_ids > 1 ? 's' : ''}
                    </Text>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: 'flex-start',
                            alignItems: 'flex-end'
                        }}
                        onPress={() => props.closeModal()}
                    >
                        <Icon name="cancel" type="material" color="#000000" />
                    </TouchableOpacity>
                </View>
                <Text>
                    {props.n_ids === 1
                        ? 'Are you sure you want to delete this item?'
                        : 'Are you sure you want to delete '.concat(
                              String(props.n_ids).concat(' items?')
                          )}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>
                    <View style={{ flex: 8, justifyContent: 'center' }}>
                        <Button
                            title="Cancel"
                            color="#000"
                            onPress={() => props.closeModal()}
                        />
                    </View>
                    <View style={{ flex: 10 }} />
                    <View style={{ flex: 8, justifyContent: 'center' }}>
                        <Button
                            title="Delete"
                            color="#D00"
                            onPress={() => props.closeDeleteModalAndDelete()}
                        />
                    </View>
                </View>
            </View>
        </Overlay>
    );
};
export default ConfirmDeleteItem;
