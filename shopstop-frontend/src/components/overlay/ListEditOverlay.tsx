import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { Overlay, Icon } from 'react-native-elements';
import { ListItemProps } from '../../store/StoreTypes';

export interface ListEditItemReq {
    item: ListItemProps;
    closeModal: (argModalState: void) => void;
    deleteListItem?: (argDelete: number) => void;
    changeListItem: (argEdit: ListItemProps) => void;
}

// Overlay that is used for editing a ListItem
const ListEditOverlay: React.FC<ListEditItemReq> = props => {
    const [hasChanged, setHasChanged] = useState(false);
    const [initialItem] = useState(props.item);
    const [item, updateItem] = useState(props.item);

    // this function decides if the textboxes has changed, and if it has then the "save" button can be displayed
    function checkForChange(initialValue: any, value: any) {
        if (initialValue !== value) {
            setHasChanged(true);
        } else {
            setHasChanged(false);
        }
    }

    // This function handles the change of the name
    function onChangeText(newName: string) {
        checkForChange(initialItem.name, newName);
        updateItem({ ...item, name: newName });
    }

    // This function handles the input of a new abount of an item
    function onChangeQuantity(newQuantityString: string) {
        let newQuantity = 0;
        if (newQuantityString !== undefined && newQuantityString !== '') {
            newQuantity = Number(newQuantityString.replace(/\D/g, ''));
        }
        if (newQuantity > 1000000) {
            newQuantity = 1000000;
        } else if (newQuantity < 0) {
            newQuantity = 0;
        }
        checkForChange(initialItem.quantity, newQuantity);
        updateItem({ ...item, quantity: newQuantity });
    }

    function closeModal() {
        props.closeModal();
    }

    function closeModalAndConfirm() {
        props.changeListItem(item);
        closeModal();
    }

    function closeModalAndDelete() {
        if (props.deleteListItem !== undefined) {
            props.deleteListItem(item.id);
        }
        props.closeModal();
    }

    return (
        <Overlay
            isVisible
            onBackdropPress={() => props.closeModal()}
            height={150}
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
                        Change Item:
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
                <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text>Name: </Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <TextInput
                            keyboardType="default"
                            placeholder="Name of item"
                            value={item.name}
                            onChangeText={(text: string) => onChangeText(text)}
                        />
                    </View>
                </View>
                {typeof props.item.quantity !== 'undefined' && (
                    <View
                        style={{ flexDirection: 'row', alignItems: 'stretch' }}
                    >
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text>Quantity: </Text>
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <TextInput
                                keyboardType="numeric"
                                placeholder="Amount of items"
                                value={String(item.quantity)}
                                onChangeText={(text: string) =>
                                    onChangeQuantity(text)
                                }
                            />
                        </View>
                    </View>
                )}
                <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>
                    {typeof props.deleteListItem === 'function' && (
                        <View style={{ flex: 8, justifyContent: 'center' }}>
                            <Button
                                title="Delete"
                                color="#d00"
                                onPress={() => closeModalAndDelete()}
                            />
                        </View>
                    )}
                    <View style={{ flex: 1 }} />
                    <View style={{ flex: 8, justifyContent: 'center' }}>
                        <Button
                            title="Cancel"
                            color="#000"
                            onPress={() => props.closeModal()}
                        />
                    </View>
                    <View style={{ flex: 1 }} />
                    <View style={{ flex: 8, justifyContent: 'center' }}>
                        <Button
                            title="Save"
                            disabled={!hasChanged}
                            // color="#0cc"
                            onPress={() => closeModalAndConfirm()}
                        />
                    </View>
                </View>
            </View>
        </Overlay>
    );
};
export default ListEditOverlay;
