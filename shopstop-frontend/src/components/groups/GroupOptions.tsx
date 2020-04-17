import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger
} from 'react-native-popup-menu';
import { Context } from '../../store/Store';

// component on the top navigation bar to invite a user to the group
const GroupOptions: React.FC = () => {
    const navigation = useNavigation();
    const [state] = useContext(Context);
    const goToInviteUser = () => {
        navigation.navigate('invite');
    };
    if (!state.selectedGroup) return <></>;
    return (
        <TouchableOpacity style={{ paddingRight: 20 }}>
            <Menu>
                <MenuTrigger>
                    <Icon name="person-add" type="material" />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{ marginTop: 30 }}>
                    <MenuOption
                        onSelect={goToInviteUser}
                        text="Invite User"
                        customStyles={{ optionWrapper: { padding: 20 } }}
                    />
                </MenuOptions>
            </Menu>
        </TouchableOpacity>
    );
};

export default GroupOptions;
