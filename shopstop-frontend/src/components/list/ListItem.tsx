import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, Tooltip } from 'react-native-elements';
import { ListItemProps } from '../../store/StoreTypes';
import { Context } from '../../store/Store';

export interface ListItemInterface {
    item: ListItemProps;
    openEditModal: (argEdit: ListItemProps) => void;
    changeListItem: (argCheck: ListItemProps) => void;
    index: number;
    deleteMode?: Boolean;
    selectForDelete: (argDelete: ListItemProps) => void;
}

const ListItemNormal: React.FC<ListItemInterface> = props => {
    const [state, dispatch] = useContext(Context);
    function handleCheck() {
        props.changeListItem({ ...props.item, bought: !props.item.bought });
    }

    function handleEdit() {
        props.openEditModal(props.item);
    }

    return (
        <View
            style={[
                styles.listItemContainer,
                Number(props.index) % 2 !== 0
                    ? { backgroundColor: '#ffffff' }
                    : { backgroundColor: '#f8f8f8' } // Alternating backgroundColor
            ]}
        >
            <View style={styles.iconStyle}>
                <TouchableOpacity onPress={() => handleEdit()}>
                    <Tooltip
                        backgroundColor="#00d"
                        toggleOnPress={!state.tutorial.editMode}
                        popover={
                            <Text style={{color:"#fff"}}>
                                Tap here to edit an item
                            </Text>
                        }
                        onClose={
                            () => {
                                dispatch({
                                    type: 'SET_TUTORIAL_LIST',
                                    payload: {...state.tutorial, editMode:true}
                                });
                                handleEdit();
                            }
                        }
                    >
                        <Icon color="#000" name="edit" size={30} />
                    </Tooltip>
                </TouchableOpacity>
            </View>
            <Text style={ props.item.bought ? styles.textStyleNameFaded : styles.textStyleName } >{props.item.name}</Text>
            <Text style={ props.item.bought ? styles.textStyleQuantityFaded : styles.textStyleQuantity } >{props.item.quantity}</Text>
            <View style={styles.iconStyle}>
                <TouchableOpacity onPress={() => handleCheck()}>
                    <Tooltip
                        backgroundColor="#00d"
                        toggleOnPress={!state.tutorial.toggleBought}
                        popover={
                            <Text style={{color:"#fff"}}>
                                Tap here to mark an item as bought
                            </Text>
                        }
                        onClose={
                            () => {
                                dispatch({
                                    type: 'SET_TUTORIAL_LIST',
                                    payload: {...state.tutorial, toggleBought:true}
                                });
                                handleCheck();
                            }
                        }
                    >
                        <Icon
                            color="#000"
                            name={
                                props.item.bought
                                    ? 'check-box'
                                    : 'check-box-outline-blank'
                            }
                            size={30}
                        />
                    </Tooltip>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const ListItemDelete: React.FC<ListItemInterface> = props => {
    function handleDelete() {
        props.selectForDelete(props.item.id)
    }

    return (
        <View
            style={[
                styles.listItemContainer,
                Number(props.index) % 2 !== 0
                    ? { backgroundColor: '#ffffff' }
                    : { backgroundColor: '#f8f8f8' } // Alternating backgroundColor
            ]}
        >
            <View style={styles.iconStyle}>
                <TouchableOpacity onPress={() => handleDelete()}>
                    <Icon
                        color={props.markedForDelete ? '#DD0000' : '#DDDDDD'}
                        name='delete'
                        size={30}
                    />
                </TouchableOpacity>
            </View>
            <Text style={ props.markedForDelete ? styles.textStyleNameFaded : styles.textStyleName } >
                {props.item.name} {props.deleteSelected ? "Delete" : ""}
            </Text>
            <Text style={ props.markedForDelete ? styles.textStyleQuantityFaded : styles.textStyleQuantity } >
                {props.item.quantity}
            </Text>
            <View style={styles.iconStyle}>
                <Icon
                    color='#DDDDDD'
                    name={
                        props.item.bought
                            ? 'check-box'
                            : 'check-box-outline-blank'
                    }
                    size={30}
                />
            </View>
        </View>
    );
};

const ListItem: React.FC<ListItemInterface> = props => {
    if (props.deleteMode == true) {
        return <ListItemDelete {...props} />;
    }
    return <ListItemNormal {...props} />;
};

const styles = StyleSheet.create({
    iconStyle: {
        alignSelf: 'center',
        flex: 2,
        justifyContent: 'center'
    },
    listItemContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    textStyleName: {
        alignSelf: 'center',
        flex: 8,
        paddingRight: 10,
        color: "#000000"
    },
    textStyleNameFaded: {
        alignSelf: 'center',
        flex: 8,
        paddingRight: 10,
        color: "#DDDDDD"
    },
    textStyleQuantity: {
        alignSelf: 'center',
        flex: 2,
        paddingLeft: 10,
        color: "#000000"
    },
    textStyleQuantityFaded: {
        alignSelf: 'center',
        flex: 2,
        paddingLeft: 10,
        color: "#DDDDDD"
    }
});

export default ListItem;
