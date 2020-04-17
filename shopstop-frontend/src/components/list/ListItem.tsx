import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, Tooltip } from 'react-native-elements';
import { ListItemProps, ListItemTutorialProps } from '../../store/StoreTypes';

export interface ListItemInterface {
    item: ListItemProps;
    openEditModal: (argEdit: ListItemProps) => void;
    changeListItem: (argCheck: ListItemProps) => void;
    index: number;
    deleteMode?: boolean;
    selectForDelete: (argDelete: number) => void;
    markedForDelete: boolean;
    updateTutorial: (updateItem: string) => void;
    tutorial: ListItemTutorialProps;
}

// This is a component that renders a listItem in the normal mode
const ListItemNormal: React.FC<ListItemInterface> = props => {
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
                    : { backgroundColor: '#f0faff' } // Alternating backgroundColor
            ]}
        >
            <View style={styles.iconStyle}>
                <TouchableOpacity onPress={() => handleEdit()}>
                    <Tooltip
                        backgroundColor="#00d"
                        toggleOnPress={!props.tutorial.editMode}
                        popover={
                            <Text style={{ color: '#fff' }}>
                                Tap here to edit an item
                            </Text>
                        }
                        onClose={() => {
                            props.updateTutorial('editMode');
                            handleEdit();
                        }}
                    >
                        <Icon color="#000" name="edit" size={30} />
                    </Tooltip>
                </TouchableOpacity>
            </View>
            <Text
                style={
                    props.item.bought
                        ? styles.textStyleNameFaded
                        : styles.textStyleName
                }
            >
                {props.item.name}
            </Text>
            <Text
                style={
                    props.item.bought
                        ? styles.textStyleQuantityFaded
                        : styles.textStyleQuantity
                }
            >
                {props.item.quantity}
            </Text>
            <View style={styles.iconStyle}>
                <TouchableOpacity onPress={() => handleCheck()}>
                    <Tooltip
                        backgroundColor="#00d"
                        toggleOnPress={!props.tutorial.toggleBought}
                        popover={
                            <Text style={{ color: '#fff' }}>
                                Tap here to mark an item as bought
                            </Text>
                        }
                        onClose={() => {
                            props.updateTutorial('toggleBought');
                            handleCheck();
                        }}
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

// This is a component that renders a listItem in the deletion mode
const ListItemDelete: React.FC<ListItemInterface> = props => {
    function handleDelete() {
        props.selectForDelete(props.item.id);
    }

    return (
        <View
            style={[
                styles.listItemContainer,
                Number(props.index) % 2 !== 0
                    ? { backgroundColor: '#ffffff' }
                    : { backgroundColor: '#fff8f8' } // Alternating backgroundColor
            ]}
        >
            <View style={styles.iconStyle}>
                <TouchableOpacity onPress={() => handleDelete()}>
                    <Icon
                        color={props.markedForDelete ? '#DD0000' : '#DDDDDD'}
                        name="delete"
                        size={30}
                    />
                </TouchableOpacity>
            </View>
            <Text
                style={
                    props.markedForDelete
                        ? styles.textStyleNameFaded
                        : styles.textStyleName
                }
            >
                {props.item.name}
            </Text>
            <Text
                style={
                    props.markedForDelete
                        ? styles.textStyleQuantityFaded
                        : styles.textStyleQuantity
                }
            >
                {props.item.quantity}
            </Text>
            <View style={styles.iconStyle}>
                <Icon
                    color="#DDDDDD"
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

// This is a component that selects the component that is to mount
const ListItem: React.FC<ListItemInterface> = props => {
    if (props.deleteMode === true) {
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
        color: '#000000',
        flex: 8,
        paddingRight: 10
    },
    textStyleNameFaded: {
        alignSelf: 'center',
        color: '#DDDDDD',
        flex: 8,
        paddingRight: 10
    },
    textStyleQuantity: {
        alignSelf: 'center',
        color: '#000000',
        flex: 2,
        paddingLeft: 10
    },
    textStyleQuantityFaded: {
        alignSelf: 'center',
        color: '#DDDDDD',
        flex: 2,
        paddingLeft: 10
    }
});

export default ListItem;
