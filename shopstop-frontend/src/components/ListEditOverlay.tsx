import React, {useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { Overlay, Icon }from 'react-native-elements';
import PropTypes from 'prop-types';

export interface ListEditItemReq {
    itemId: string;
    itemName: string;
    itemQuantity: string;
}


const ListEditOverlay: React.FC<ListEditItemReq> = (props)  => {
    const [hasChanged, setHasChanged] = useState(false);
    const [initialItemName] = useState(props.itemName);
    const [initialItemQuantity] = useState(props.itemQuantity);

    //this function decides if the textboxes has changed, and if it has then the "save" button can be displayed
    function checkForChange(initialValue, value) {
        if (initialValue != value){
            setHasChanged(true)
            console.log("Cond1:", "-"+initialValue, "-"+value)
        } else {
            setHasChanged(false)
            console.log("Cond2:", "-"+initialValue, "-"+value)
        }
    }

    //This function handles the change of the name
    function onChangeText(newName) {
        //console.log("initialItemName:",initialItemName,"newName:",newName, " props.itemName:", props.itemName)
        checkForChange(initialItemName, newName)
        props.setSelectedName(newName)
    }

    //This function handles the input of a new abount of an item
    function onChangeQuantity(newQuantity) {
        //console.log("initialItemQuantity:",initialItemQuantity,"newQuantity:",newQuantity, " props.itemQuantity:", props.itemQuantity)
        newQuantity = Number(newQuantity.replace(/\D/g, ""))
        if (newQuantity > 1000000){
            newQuantity = 1000000
        } else if (newQuantity < 0){
            newQuantity = 0
        }
        checkForChange(initialItemQuantity, newQuantity)
        props.setSelectedQuantity(String(newQuantity))
    }

    function closeModal() {
        setHasChanged(false)
        //console.log("Modal closed")
        props.setModalState(false)
    }

    function closeModalAndConfirm() {
        setHasChanged(false)
        //console.log("Modal closed, and changes has been confirmed")

        //TODO
        //ADD THE DATABASE CHANGES HERE
        props.setModalState(false)
    }


    function closeModalAndDelete() {
        setHasChanged(false)
        //console.log("Modal closed, and changes has been confirmed")

        //TODO
        //ADD THE DATABASE CHANGES HERE
        props.setModalState(false)
    }


    return (
        <Overlay
            isVisible={props.modalState}
            onPress={() => closeModal()}
            //onBackdropPress={() => closeModal()}
            height={150}
        >
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
                <View style={{flexDirection: 'row', alignItems: 'stretch'}}>
                    <Text style={{flex: 1, justifyContent:'center', fontSize: 20}}>Edit item #{props.itemId}</Text>
                    <TouchableOpacity style={{flex: 1, justifyContent:'flex-start', alignItems: 'flex-end'}} onPress={() => closeModal()}>
                        <Icon
                            name='cancel'
                            type='material'
                            color='#000000'
                        />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'stretch'}}>
                    <View style={{flex: 1, justifyContent:'center'}}>
                        <Text>Name: </Text>
                    </View>
                    <View style={{flex: 4, justifyContent:'center'}}>
                        <TextInput
                            type="text"
                            keyboardType='default'
                            placeholder="Name of item"
                            value={props.itemName}
                            onChangeText={text => onChangeText(text)}></TextInput>
                    </View>
                </View>
                {props.itemQuantity &&
                    <View style={{flexDirection: 'row',alignItems: 'stretch'}}>
                        <View style={{flex: 1, justifyContent:'center'}}>
                            <Text>Amount: </Text>
                        </View>
                        <View style={{flex: 4, justifyContent:'center'}}>
                            <TextInput
                                type="number"
                                keyboardType='numeric'
                                placeholder="Amount of items"
                                value={props.itemQuantity}
                                onChangeText={text => onChangeQuantity(text)}>
                            </TextInput>
                        </View>
                    </View>
                }
                <View style={{flexDirection: 'row', alignItems: 'space-between'}}>
                    {typeof deleteFunction === 'undefined' &&
                    <View style={{flex: 8, justifyContent:'center'}}>
                        <Button
                            title="Delete"
                            color="#f22"
                            onPress={() => closeModalAndDelete()}
                        />
                    </View>}
                    <View style={{flex: 1}}/>
                    <View style={{flex: 8, justifyContent:'center'}}>
                        <Button
                            title = "Cancel"
                            color="#000"
                            onPress={() => closeModal()}
                        />
                    </View>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 8, justifyContent:'center'}}>
                        <Button
                            title = "Save"
                            disabled={!hasChanged}
                            //color="#0cc"
                            onPress={() => closeModalAndConfirm()}
                        />
                    </View>
                </View>
            </View>
        </Overlay>
    );
}
export default ListEditOverlay;

ListEditOverlay.propTypes = {
    itemName:               PropTypes.string.isRequired,
    itemId:                 PropTypes.number.isRequired,
    itemQuantity:           PropTypes.string,
    modalState:             PropTypes.bool.isRequired,
    setModalState:          PropTypes.func.isRequired,
    setSelectedName:        PropTypes.func.isRequired,
    setSelectedQuantity:    PropTypes.func.isRequired,
    deleteFunction:         PropTypes.func,//Not required, but if you add it then you can handle deletes
};
