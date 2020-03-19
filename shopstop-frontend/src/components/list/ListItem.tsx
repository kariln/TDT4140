import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ListItemProps } from '../../store/StoreTypes';

export interface ListItemInterface {
    item: ListItemProps;
    openEditModal: (argEdit: ListItemProps) => void;
    changeListItem: (argCheck: ListItemProps) => void;
    index: number;
    deleteMode?: Boolean;
    selectForDelete: (argDelete: ListItemProps) => void;
}

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
                    : { backgroundColor: '#f8f8f8' } // Alternating backgroundColor
            ]}
        >
            <View style={styles.iconStyle}>
                <TouchableOpacity onPress={() => handleEdit()}>
                    <Icon color="#000" name="edit" size={30} />
                </TouchableOpacity>
            </View>
            <Text style={styles.textStyleName}>{props.item.name}</Text>
            <Text style={styles.textStyleQuantity}>{props.item.quantity}</Text>
            <View style={styles.iconStyle}>
                <TouchableOpacity onPress={() => handleCheck()}>
                    <Icon
                        color="#000"
                        name={
                            props.item.bought
                                ? 'check-box'
                                : 'check-box-outline-blank'
                        }
                        size={30}
                    />
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
            <View style={styles.iconStyle} />
            <Text style={props.markedForDelete ? styles.textStyleNameDelete : styles.textStyleName }>
                {props.item.name} {props.deleteSelected ? "Delete" : ""}
            </Text>
            <Text style={props.markedForDelete ? styles.textStyleQuantityDelete : styles.textStyleQuantity } >
                {props.item.quantity}
            </Text>
            <View style={styles.iconStyle}>
                <TouchableOpacity onPress={() => handleDelete()}>
                    <Icon
                        color={props.markedForDelete ? '#DD0000' : '#DDDDDD'}
                        name='delete'
                        size={30}
                    />
                </TouchableOpacity>
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
    textStyleNameDelete: {
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
    textStyleQuantityDelete: {
        alignSelf: 'center',
        flex: 2,
        paddingLeft: 10,
        color: "#DDDDDD"
    }
});

export default ListItem;
