import React, {useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { Overlay, Icon }from 'react-native-elements';
import PropTypes from 'prop-types';

export interface ListEditItemReq {
    itemId: string;
    itemName: string;
    itemCount: string;
}


const ListEditOverlay: React.FC<ListEditItemReq> = (props)  => {
    const [hasChanged, setHasChanged] = useState(false);
    const [initialItemName] = useState(props.itemName);
    const [initialItemCount] = useState(props.itemCount);

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
    function onChangeCount(newCount) {
        //console.log("initialItemCount:",initialItemCount,"newCount:",newCount, " props.itemCount:", props.itemCount)
        newCount = Number(newCount.replace(/\D/g, ""))
        if (newCount > 1000000){
            newCount = 1000000
        } else if (newCount < 0){
            newCount = 0
        }
        checkForChange(initialItemCount, newCount)
        props.setSelectedCount(String(newCount))
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
                {props.itemCount &&
                    <View style={{flexDirection: 'row',alignItems: 'stretch'}}>
                        <View style={{flex: 1, justifyContent:'center'}}>
                            <Text>Amount: </Text>
                        </View>
                        <View style={{flex: 4, justifyContent:'center'}}>
                            <TextInput
                                type="number"
                                keyboardType='numeric'
                                placeholder="Amount of items"
                                value={props.itemCount}
                                onChangeText={text => onChangeCount(text)}>
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
    itemName:           PropTypes.string.isRequired,
    itemId:             PropTypes.string.isRequired,
    itemCount:          PropTypes.string,
    modalState:         PropTypes.bool.isRequired,
    setModalState:      PropTypes.func.isRequired,
    setSelectedName:    PropTypes.func.isRequired,
    setSelectedCount:   PropTypes.func.isRequired,
    deleteFunction:     PropTypes.func,//Not required, but if you add it then you can handle deletes
};
